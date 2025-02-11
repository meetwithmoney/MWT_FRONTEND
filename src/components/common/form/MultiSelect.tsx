import { useState, useRef, useCallback } from "react";
import {
  default as ReactSelect,
  components,
  InputAction,
  MultiValue,
  ValueContainerProps,
} from "react-select";

export type Option = {
  value: string | number;
  label: string;
  uuid?: string;
};

type FilterMultiSelectInput = {
  options: Option[];
  setIsOpen?: (e: boolean) => void;
  isOpen?: boolean;
  onChange: (selectedOptions: Option[]) => void;
  value: Option[];
  isSelectAll: boolean;
  name?: string;
  placeholder?: string;
};

const MultiSelect: React.FC<FilterMultiSelectInput> = (props) => {
  const [selectInput, setSelectInput] = useState<string>("");
  const isAllSelected = useRef<boolean>(false);
  // const selectAllLabel = useRef<string>("Select all");
  const allOption: Option = { value: "*", label: "Select all" };

  const filterOptions = (options: Option[], input: string) =>
    options?.filter(({ label }: Option) =>
      label.toLowerCase().includes(input.toLowerCase())
    );

  const comparator = (v1: Option, v2: Option) =>
    (v1.value as number) - (v2.value as number);

  let filteredOptions = filterOptions(props.options, selectInput);
  let filteredSelectedOptions = filterOptions(props.value, selectInput);

  const Option = (_props: any) => (
    <components.Option {..._props}>
      {_props.value === "*" &&
        !isAllSelected.current &&
        filteredSelectedOptions?.length > 0 ? (
        <input
          key={_props.value}
          type="checkbox"
          ref={(input) => {
            if (input) input.indeterminate = true;
          }}
        />
      ) : (
        <input
          key={_props.value}
          type="checkbox"
          checked={_props.isSelected || isAllSelected.current}
          onChange={() => { }}
        />
      )}
      <label style={{ marginLeft: "5px" }}>{_props.label}</label>
    </components.Option>
  );

  const customFilterOption = ({ value, label }: Option, input: string) =>
    (value !== "*" && label.toLowerCase().includes(input.toLowerCase())) ||
    (value === "*" && filteredOptions?.length > 0);

  const onInputChange = (
    inputValue: string,
    event: { action: InputAction }
  ) => {
    if (event.action === "input-change") setSelectInput(inputValue);
    else if (event.action === "menu-close" && selectInput !== "")
      setSelectInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if ((e.key === " " || e.key === "Enter") && !selectInput)
      e.preventDefault();
  };

  const handleChange = (selected: MultiValue<Option>) => {
    const selectedOptions = selected as Option[];
    if (
      selectedOptions.length > 0 &&
      !isAllSelected.current &&
      (selectedOptions[selectedOptions.length - 1].value === allOption.value ||
        JSON.stringify(filteredOptions) ===
        JSON.stringify(selectedOptions.sort(comparator)))
    )
      return props.onChange(
        [
          ...(props.value ?? []),
          ...props.options.filter(
            ({ label }: Option) =>
              label.toLowerCase().includes(selectInput?.toLowerCase()) &&
              (props.value ?? []).filter((opt: Option) => opt.label === label)
                .length === 0
          ),
        ].sort(comparator)
      );
    else if (
      selectedOptions.length > 0 &&
      selectedOptions[selectedOptions.length - 1].value !== allOption.value &&
      JSON.stringify(selectedOptions.sort(comparator)) !==
      JSON.stringify(filteredOptions)
    )
      return props.onChange(selectedOptions);
    else
      return props.onChange([
        ...props.value?.filter(
          ({ label }: Option) =>
            !label.toLowerCase().includes(selectInput?.toLowerCase())
        ),
      ]);
  };

  const ValueContainer = ({
    children,
    ...props
  }: ValueContainerProps<Option>) => {
    let [values, input] = children as any;
    if (Array.isArray(values)) {
      const plural = values.length === 1 ? "" : "s";
      values = `${values.length} item${plural} selected`;
    }
    return (
      <div className="text-left">
        <components.ValueContainer {...props}>
          {values}
          {input}
        </components.ValueContainer>
      </div>
    );
  };

  const setAllOptionLabel = useCallback(() => {
    isAllSelected.current = filteredSelectedOptions?.length === filteredOptions?.length;
    if (filteredSelectedOptions?.length > 0) {
      if (filteredSelectedOptions?.length === filteredOptions?.length)
        return `All (${filteredOptions.length}) selected`;
      else
        return `${filteredSelectedOptions?.length} / ${filteredOptions.length} selected`;
    }
  }, [filteredSelectedOptions, filteredOptions]);

  if (props.isSelectAll && props.options.length !== 0) {
    // isAllSelected.current = JSON.stringify(filteredSelectedOptions) === JSON.stringify(filteredOptions);
    // isAllSelected.current = filteredSelectedOptions?.length === filteredOptions?.length;
    // if (filteredSelectedOptions?.length > 0) {
    //   if (filteredSelectedOptions?.length === filteredOptions?.length)
    //     selectAllLabel.current = `All (${filteredOptions.length}) selected`;
    //   else
    //     selectAllLabel.current = `${filteredSelectedOptions?.length} / ${filteredOptions.length} selected`;
    // } else selectAllLabel.current = "Select all";

    allOption.label = setAllOptionLabel() || "Select all";

    return (
      <div>
        <ReactSelect
          {...props}
          inputValue={selectInput}
          onInputChange={onInputChange}
          onKeyDown={onKeyDown}
          options={[allOption, ...props.options]}
          onChange={handleChange}
          className="custom-select"
          classNamePrefix="form-control"
          components={{
            Option: Option,
            ValueContainer,
          }}
          placeholder={props.placeholder || ""}
          isSearchable={false}
          filterOption={customFilterOption}
          isMulti
          closeMenuOnSelect={false}
          tabSelectsValue={false}
          backspaceRemovesValue={false}
          hideSelectedOptions={false}
          blurInputOnSelect={false}
          name={props.name}
        />
      </div>
    );
  } else return null;
};

export default MultiSelect;
