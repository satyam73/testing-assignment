import { fireEvent, render, screen } from "@testing-library/react";
import { jest } from '@jest/globals';

import { Input } from "../../src/todo/components/input";
import * as commonUtils from "../../src/utils/common";

describe('Unit | Components | Input', () => {
  let mockedOnSubmitFn = jest.fn();
  let mockedOnBlurFn = jest.fn();
  const testPlaceholderValue = 'test placeholder';
  const testLabelValue = 'test label';
  const testDefaultValue = 'test default value';

  beforeEach(() => {
    mockedOnSubmitFn = jest.fn();
    mockedOnBlurFn = jest.fn()
  });

  it('should render the component with default data and attributes', () => {
    render(
      <Input
        onSubmit={mockedOnSubmitFn} placeholder={testPlaceholderValue} label={testLabelValue} defaultValue={testDefaultValue} onBlur={mockedOnBlurFn}
      />
    )


    const input = screen.getByTestId('text-input');
    const label = screen.queryByTestId('input-label');

    // assertions for input
    expect(input).toBeInTheDocument();
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute('placeholder', testPlaceholderValue);
    expect(input).toHaveValue(testDefaultValue);


    // assertions for labels
    expect(label).toHaveAttribute('class', 'visually-hidden');
    expect(label).toHaveAttribute('for', 'todo-input');
    expect(label).toHaveTextContent('test label');
  });

  it('should trigger the blur event on input', () => {
    render(
      <Input
        onSubmit={mockedOnSubmitFn} placeholder={testPlaceholderValue} label={testLabelValue} defaultValue={testDefaultValue} onBlur={mockedOnBlurFn}
      />
    )
    const input = screen.getByTestId('text-input');

    fireEvent.blur(input);

    expect(mockedOnBlurFn).toHaveBeenCalledTimes(1);
  });

  it('should not trigger the function onBlur if function is not present', () => {
    render(
      <Input
        onSubmit={mockedOnSubmitFn} placeholder={testPlaceholderValue} label={testLabelValue} defaultValue={testDefaultValue}
      />
    )

    const input = screen.getByTestId('text-input');

    fireEvent.blur(input);

    expect(mockedOnBlurFn).not.toHaveBeenCalledTimes(1);
  });


  it('should trigger the key down event on input and call mocked on submit function only when hasValidMin returns true else shouldn\'t trigger', () => {
    let hasValidMinStub = jest.spyOn(commonUtils, 'hasValidMin').mockReturnValueOnce(false);
    render(
      <Input
        onSubmit={mockedOnSubmitFn} placeholder={testPlaceholderValue} label={testLabelValue} defaultValue={testDefaultValue} onBlur={mockedOnBlurFn}
      />
    )
    const input = screen.getByTestId('text-input');

    fireEvent.keyDown(input);

    expect(mockedOnSubmitFn).toHaveBeenCalledTimes(0);

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockedOnSubmitFn).toHaveBeenCalledTimes(0);

    hasValidMinStub = jest.spyOn(commonUtils, 'hasValidMin').mockReturnValueOnce(true);

    hasValidMinStub.mockRestore()

    fireEvent.keyDown(input, { key: 'Enter' });

    expect(mockedOnSubmitFn).toHaveBeenCalledTimes(1);
  });
});


