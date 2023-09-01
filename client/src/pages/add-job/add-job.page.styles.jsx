import styled from "styled-components";

const Wrapper = styled.section`
  background-color: var(--background-secondary-color);
  padding: 3rem 2rem;
  border-radius: 5px;
  .add-job-form {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 1rem;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 992px) {
      grid-template-columns: repeat(3, 1fr);
      .btn {
        margin-top: 20px;
      }
    }
  }
`;

export default Wrapper;
