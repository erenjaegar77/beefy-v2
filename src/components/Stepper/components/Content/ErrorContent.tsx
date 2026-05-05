import { memo, type MouseEventHandler, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isWalletActionError } from '../../../../features/data/actions/wallet/wallet-action.ts';
import { useAppSelector } from '../../../../features/data/store/hooks.ts';
import iconError from '../../../../images/icons/error.svg';
import { Title } from '../Title/Title.tsx';
import { CloseButton } from './common/CloseButton.tsx';
import { Buttons, Content, ErrorIcon, ErrorMessageBox, FriendlyMessage } from './common/Common.tsx';

export const ErrorContent = memo(function ErrorContent() {
  const { t } = useTranslation();
  const walletActionsState = useAppSelector(state => state.user.walletActions);
  const handleSelectAll = useCallback<MouseEventHandler<HTMLDivElement>>(e => {
    if (e.target instanceof HTMLElement && window.getSelection) {
      const selection = window.getSelection();
      if (selection) {
        selection.selectAllChildren(e.target);
      }
    }
  }, []);

  if (!isWalletActionError(walletActionsState)) {
    return null;
  }

  return (
    <>
      <Title
        text={
          <>
            <ErrorIcon src={iconError} alt="error" />
            {t('Transactn-Error')}
          </>
        }
      />

      <Content variant="error">
        {walletActionsState.data.error.friendlyMessage && (
          <FriendlyMessage>{walletActionsState.data.error.friendlyMessage}</FriendlyMessage>
        )}
        <ErrorMessageBox className="scrollbar" onClick={handleSelectAll}>
          {walletActionsState.data.error.message}
        </ErrorMessageBox>
      </Content>
      <Buttons>
        <CloseButton />
      </Buttons>
    </>
  );
});
