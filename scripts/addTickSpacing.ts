import { getVaultsForChain } from './common/config.ts';
import { saveJson } from './common/files.ts';
import { allChainIds, type AppChainId } from './common/chains.ts';
import { sortVaultKeys } from './common/vault-fields.ts';
import { type Abi, type Address, getContract } from 'viem';
import { getViemClient } from './common/viem.ts';
import type { VaultConfig } from '../src/features/data/apis/config-types.ts';

const tickSpacingAbi = [
  {
    inputs: [],
    name: 'tickSpacing',
    outputs: [
      {
        internalType: 'int24',
        name: '',
        type: 'int24',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const satisfies Abi;

async function fetchTickSpacingForTokens(
  tokenAddresses: string[],
  chainId: AppChainId
): Promise<Record<string, number | undefined>> {
  const viemClient = getViemClient(chainId);
  const uniqAddresses = Array.from(new Set(tokenAddresses.map(a => a.toLowerCase())));
  const results = await Promise.allSettled(
    uniqAddresses.map(address => {
      const contract = getContract({
        abi: tickSpacingAbi,
        address: address as Address,
        client: viemClient,
      });
      return contract.read.tickSpacing();
    })
  );

  return Object.fromEntries(
    results.map((result, i) => {
      if (result.status === 'rejected') {
        console.error(
          `Failed to fetch tickSpacing for ${uniqAddresses[i]} on ${chainId}:`,
          result.reason instanceof Error ? result.reason.message : result.reason
        );
        return [uniqAddresses[i], undefined];
      }
      return [uniqAddresses[i], Number(result.value)];
    })
  );
}

async function getModifiedConfig(chainId: AppChainId) {
  const vaults = await getVaultsForChain(chainId);
  const checkVault = (
    vault: VaultConfig
  ): vault is Omit<VaultConfig, 'tokenAddress'> & { tokenAddress: string } =>
    !!vault.tokenAddress && vault.type === 'cowcentrated';

  const targetVaults = vaults.filter(checkVault);
  if (targetVaults.length === 0) {
    return vaults;
  }

  const tickSpacingByAddress = await fetchTickSpacingForTokens(
    targetVaults.map(vault => vault.tokenAddress),
    chainId
  );

  return vaults.map(vault => {
    if (!checkVault(vault)) {
      return vault;
    }
    const existing = vault.tickSpacing;
    const expected = tickSpacingByAddress[vault.tokenAddress.toLowerCase()];
    if (expected === undefined || isNaN(expected)) {
      return vault;
    }

    if (existing === expected) {
      return vault;
    }

    console.log(
      `Setting tickSpacing of vault ${vault.id} on ${vault.network} from ${existing} to ${expected}...`
    );
    return sortVaultKeys({ ...vault, tickSpacing: expected });
  });
}

async function start() {
  const modified = await Promise.allSettled(allChainIds.map(getModifiedConfig));

  for (let i = 0; i < allChainIds.length; i++) {
    const result = modified[i];
    if (result.status === 'rejected') {
      console.error(`Failed to fetch tickSpacing for chain ${allChainIds[i]}:`, result.reason);
      continue;
    }
    await saveJson(`./src/config/vault/${allChainIds[i]}.json`, result.value, 'prettier');
  }
}

start().catch(e => {
  console.error(e);
  process.exit(1);
});
