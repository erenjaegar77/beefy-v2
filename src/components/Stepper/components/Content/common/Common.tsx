import { styled } from '@repo/styles/jsx';
import { ExternalLink } from '../../../../Links/ExternalLink.tsx';

export const Content = styled('div', {
  base: {
    marginTop: '12px',
    padding: '16px',
    borderRadius: '8px',
    display: 'flex',
    maxWidth: '100%',
    flexDirection: 'column',
    gap: '16px',
  },
  variants: {
    variant: {
      success: { backgroundColor: 'stepperSuccessBackground' },
      bridging: { backgroundColor: 'stepperBridgingBackground' },
      error: { backgroundColor: 'stepperErrorBackground' },
      recovery: { backgroundColor: 'stepperRecoveryBackground' },
    },
  },
});

export const Message = styled('div', {
  base: {
    '& span': {
      fontWeight: 'medium',
    },
  },
  variants: {
    variant: {
      recoveryAction: {
        marginTop: '12px',
      },
    },
  },
});

export const MessageHighlight = styled('div', {
  base: {
    fontWeight: 'medium',
  },
});

export const FriendlyMessage = styled('div', {
  base: {
    textStyle: 'body.medium',
  },
});

export const ErrorMessageBox = styled('div', {
  base: {
    '--colors-scrollbar-thumb': 'colors.stepperErrorBackground',
    width: '100%',
    maxHeight: 'min(calc(80vw), 300px)',
    overflowX: 'hidden',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'monospace',
    backgroundColor: 'stepperErrorBackground',
    padding: '4px',
    borderRadius: '8px',
    lineHeight: '1.1',
  },
});

export const ErrorIcon = styled('img', {
  base: {
    height: '20px',
    marginRight: '8px',
  },
});

export const RememberContainer = styled('div', {
  base: {
    marginTop: '16px',
  },
});

export const Buttons = styled('div', {
  base: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
    width: '100%',
    alignItems: 'stretch',
    gap: '10px',
    marginTop: '12px',
    '& > *': {
      height: '44px',
    },
  },
  variants: {
    layout: {
      retryClose: {
        gridAutoColumns: 'unset',
        gridTemplateColumns: '1fr auto',
      },
    },
  },
});

export const TrackingLink = styled(ExternalLink, {
  base: {
    textDecoration: 'none',
    color: 'green.80-40',
  },
});
