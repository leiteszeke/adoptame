import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Text,
} from 'react-native';
import C, { apply, classNames, theme } from 'consistencss';
import { ForwardedTextAreaProps, TextAreaProps } from './TextArea.types';

const TextArea: ForwardRefRenderFunction<
  ForwardedTextAreaProps,
  TextAreaProps
> = ({ containerStyle, label, labelStyle, inputStyle, onChange }, ref) => {
  const inputRef = useRef<string>('');
  const [innerValue, setInnerValue] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);

  const getValue = () => inputRef.current;
  const blur = () => setFocused(false);
  const focus = () => setFocused(true);

  const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const newValue = e.nativeEvent.text;

    inputRef.current = newValue;

    setInnerValue(newValue);
    onChange?.(newValue);
  };

  useImperativeHandle(
    ref,
    () => ({
      focus,
      blur,
      getValue,
    }),
    [],
  );

  return (
    <View
      style={apply(
        C.h21,
        C.wFull,
        C.borderbottomDouble,
        C.justifyEnd,
        C.borderbottomDark3,
        containerStyle,
      )}>
      <View
        style={apply(
          classNames(
            'absolute hFull',
            {
              top4: !focused && innerValue.length === 0,
            },
            labelStyle,
          ),
        )}>
        <Text
          style={classNames('textDark4', {
            font3: !focused,
            font2: focused || innerValue.length > 0,
          })}>
          {label}
        </Text>
      </View>
      <TextInput
        underlineColorAndroid={theme.colors.transparent}
        onChange={handleChange}
        onFocus={focus}
        onBlur={blur}
        autoCapitalize="none"
        multiline
        placeholderTextColor={theme.colors.dark4}
        style={apply(
          C.bgTransparent,
          C.h16,
          C.familyPop,
          C.font3,
          C.textDark3,
          C.mb1,
          C.wFull,
          inputStyle,
        )}
      />
    </View>
  );
};

export default forwardRef(TextArea);
