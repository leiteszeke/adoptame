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
import { ForwardedInputProps, InputProps } from './Input.types';

const Input: ForwardRefRenderFunction<ForwardedInputProps, InputProps> = (
  { containerStyle, label, labelStyle, inputStyle, onChange, secureTextEntry },
  ref,
) => {
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

  const secure = secureTextEntry;

  return (
    <View
      style={apply(
        C.h9,
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
              justifyCenter: !focused && innerValue.length === 0,
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
        placeholderTextColor={theme.colors.dark4}
        secureTextEntry={secure}
        style={apply(
          C.bgTransparent,
          C.h4,
          C.familyPop,
          C.textDark3,
          C.mb1,
          C.wFull,
          inputStyle,
        )}
      />
    </View>
  );
};

export default forwardRef(Input);
