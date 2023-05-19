import React from "react";
import * as Select from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

enum BedType {
  SOLTEIRO = "Solteiro",
  DUPLO_SOLTEIRO = "Duplo solteiro",
  CASAL = "Casal",
}

const SelectDemo = () => (
  <Select.Root>
    <Select.Trigger
      className="bg-zinc-50 flex items-center justify-center p-2 rounded-lg text-base gap-[5px] outline-none w-full text-violet11 shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9"
      aria-label="Food"
    >
      <Select.Value placeholder="Select a fruit…" />
      <Select.Icon className="text-violet11">
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
    <Select.Portal>
      <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronUpIcon />
        </Select.ScrollUpButton>
        <Select.Viewport className="p-[5px]">
          <Select.Group>
            <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
              Fruits
            </Select.Label>
            <Select.Item value={BedType.SOLTEIRO}>
              {BedType.SOLTEIRO}
            </Select.Item>
            <Select.Item value={BedType.DUPLO_SOLTEIRO}>
              {BedType.DUPLO_SOLTEIRO}
            </Select.Item>
            <Select.Item value="blueberry">Blueberry</Select.Item>
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          <ChevronDownIcon />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
);

// const SelectItem = React.forwardRef(
//   ({ children, className, ...props }, forwardedRef) => {
//     return (
//       <Select.Item
//         className=
//           "text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1",

//         {...props}
//         ref={forwardedRef}

//       >
//         <Select.ItemText>{children}</Select.ItemText>
//         <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
//           <CheckIcon />
//         </Select.ItemIndicator>
//       </Select.Item>
//     );
//   }
// );

export default SelectDemo;
