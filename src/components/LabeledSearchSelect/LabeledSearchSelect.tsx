import type { ChangeEvent } from 'react';
import { memo, useMemo } from 'react';
import { styles } from './styles';
import { Checkbox, makeStyles } from '@material-ui/core';
import { useAutocomplete } from '@material-ui/lab';
import { Trans, useTranslation } from 'react-i18next';
import { ExpandMore } from '@material-ui/icons';
import clsx from 'clsx';

const useStyles = makeStyles(styles);

interface LabeledSearchProps {
  id: string;
  onChange: (event: ChangeEvent, options: LabelSearchSelectOptionType[]) => void;
  options: Record<string, string>;
  label: string;
  value: string;
  selectedOptions: string[];
  multiple?: boolean;
  className?: string;
}

export interface LabelSearchSelectOptionType {
  label: string;
  value: string | null;
}

export const LabeledSearchSelect = memo<LabeledSearchProps>(function LabelesedSearchSelect({
  id,
  className,
  onChange,
  options,
  label,
  value,
  selectedOptions,
  multiple = false,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const wrappedOptions: LabelSearchSelectOptionType[] = useMemo(() => {
    return Object.keys(options).map(option => {
      return { label: options[option], value: option };
    });
  }, [options]);

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: `customized-search-select-${id}`,
    options: wrappedOptions,
    multiple,
    disableCloseOnSelect: multiple,
    getOptionLabel: (option: LabelSearchSelectOptionType) => option.label,
    onChange,
    openOnFocus: true,
    selectOnFocus: true,
    freeSolo: true,
  });

  return (
    <div className={className} {...getRootProps()}>
      <div className={classes.container}>
        <div
          ref={setAnchorEl}
          className={clsx(classes.inputWrapper, { [classes.inputHided]: !focused })}
        >
          {!focused && (
            <Trans
              t={t}
              i18nKey={'Search-Value-Filter'}
              values={{ label, value }}
              components={{ white: <span className={classes.value} /> }}
            />
          )}
          <input {...getInputProps()} />
        </div>
        <ExpandMore className={clsx(classes.selectIcon, { [classes.openIcon]: focused })} />
      </div>
      {groupedOptions.length > 0 && (
        <ul className={classes.dropdown} {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li
              className={classes.dropdownItem}
              key={option.value}
              {...getOptionProps({ option, index })}
            >
              <Checkbox
                style={{ marginRight: 8 }}
                checked={selectedOptions?.includes(option.value)}
              />
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});