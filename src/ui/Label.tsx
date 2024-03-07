interface Props {
  htmlFor: string;
  label: string;
}

function Label({ htmlFor, label }: Props) {
  return <label htmlFor={htmlFor}>{label}</label>;
}

export default Label;
