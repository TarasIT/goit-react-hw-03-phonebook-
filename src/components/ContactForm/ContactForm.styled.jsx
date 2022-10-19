import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

export const FormLabel = styled.label`
  margin-right: 10px;
  font-size: 18px;
  font-weight: 500;
`;

export const FormInput = styled.input`
  min-width: 200px;
  height: 30px;
  border-radius: 5px;
  margin-left: 10px;
  font-size: 18px;
`;

export const SubmitBtn = styled.button`
  min-width: 150px;
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  background-color: #e2e2e2;

  :hover,
  :focus {
    background-color: #c4c4c4;
  }
`;
