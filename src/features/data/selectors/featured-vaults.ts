import { arrayOrStaticEmpty } from '../utils/selector-utils.ts';
import type { BeefyState } from '../store/types.ts';

export const selectFeaturedVaultIds = (state: BeefyState) =>
  arrayOrStaticEmpty(state.entities.featuredVaults.vaultIds);
