export interface AccordionData {
  label: string;
  desc: string;
  steps:
  {
    name: string;
    time?: string;
    number?: string;
    type: string;
  }[]
}