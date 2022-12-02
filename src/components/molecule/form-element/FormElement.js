import { FormField, TextInput } from "grommet"


const FormElement = (elementName, htmlFor, label)=>{
  <FormField name={{elementName}} htmlFor={htmlFor} label={label}>
        <TextInput id={htmlFor} name={elementName} />
      </FormField>
}

export default FormElement