import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 2rem;
  height: 6rem;
  text-align: right;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--primary-300);
  }
  .btn-container {
    background-color: var(--background-secondary-color);
    border-radius: var(--border-radious);
    display: flex;
  }
  .page-btn {
    background-color: transparent;
    border-color: transparent;
    width: 50px;
    height: 40px;
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--primary-500);
    cursor: pointer;
  }
  .active {
    background-color: var(--primary-500);
    color: var(--white);
  }
  .prev-btn,
  .next-btn {
    background-color: var(--background-secondary-color);
    border-radius: var(--border-radious);
    border-color: transparent;
    color: var(--primary-500);
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  .prev-btn:hover,
  .next-btn:hover {
    background-color: var(--primary-500);
    color: var(--white);
    transition: var(--transition);
  }
  .dots {
    background-color: transparent;
    display: grid;
    place-items: center;
    cursor: text;
    font-weight: 700;
  }
`;

export default Wrapper;
