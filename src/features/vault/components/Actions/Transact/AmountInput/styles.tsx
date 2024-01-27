import type { Theme } from '@material-ui/core';

export const styles = (theme: Theme) => ({
  inputContainer: {
    color: theme.palette.text.middle,
    background: theme.palette.background.searchInputBg,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '8px',
    cursor: 'default',
    boxSizing: 'border-box' as const,
    position: 'relative' as const,
  },
  inputContent: {
    display: 'flex',
    flexDirection: 'column' as const,
  },
  input: {
    ...theme.typography['body-lg-med'],
    display: 'block',
    background: 'none',
    border: 'none',
    color: theme.palette.text.light,
    height: 'auto',
    cursor: 'default',
    outline: 0,
    '&::placeholder': {
      color: theme.palette.text.dark,
      opacity: 1,
    },
    '&::focus ': {
      outline: 0,
    },
  },
  error: {
    border: `1px solid ${theme.palette.background.indicators.error}`,
  },
  fullWidth: {
    width: '100%',
  },
  price: {
    ...theme.typography['subline-sm'],
    color: theme.palette.text.dark,
  },
  max: {
    ...theme.typography['subline-sm'],
    color: theme.palette.text.light,
    backgroundColor: theme.palette.background.border,
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    borderRadius: '4px',
    margin: 0,
    padding: '6px 12px',
    minWidth: 0,
    flexShrink: 0,
    cursor: 'pointer',
    '&:disabled': {
      color: theme.palette.text.dark,
      backgroundColor: theme.palette.background.buttons.button,
      borderColor: theme.palette.background.contentLight,
      opacity: 0.4,
    },
  },
});
