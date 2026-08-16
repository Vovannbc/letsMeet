import { useState } from 'react';
import { Button } from 'react-native';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

const DatePicker = ({ title = 'Open', onChange, value = null }: { title: string, onChange: (date: DateType | null) => void, value: Date | null }) => {
  const [open, setOpen] = useState(false);
  const defaultStyles = useDefaultStyles();

  return (
    <>
      <Button title={title} onPress={() => setOpen(true)} />
      {open && (
        <DateTimePicker
          mode="single"
          date={value || new Date()}
          onChange={({ date }) => {
            onChange(date);
            setOpen(false);
          }}
          styles={defaultStyles}
        />)
      }
    </>
  )
}

export default DatePicker;
