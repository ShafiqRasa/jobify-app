import { styled } from "styled-components";

export const Wrapper = styled.button`
  background: transparent;
  background-color: transparent;
  border-color: transparent;
  width: 2.5rem;
  height: 2rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  .toggle-icon {
    font-size: 1.15rem;
    color: var(--text-color);
  }
`;
