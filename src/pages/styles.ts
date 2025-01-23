import styled from "styled-components";
import finance from '../assets/finance.png';

// Shared Styles
const flexCenterColumn = `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const inputStyles = `
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Containers
export const Container = styled.div`
  ${flexCenterColumn};
  min-height: calc(100vh - 100px);
  background-color: #faedfa;
  padding-bottom: 5rem;
`;

export const TableContainer = styled.div`
  ${flexCenterColumn};
  min-height: calc(100vh - 100px);
  background-color: #faedfa;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const UploadContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

// Typography
export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;

export const SuccessMessage = styled.p`
  margin-top: 20px;
  color: green;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

// Image
export const ImageContainer = styled.div`
  background-image: url(${finance});
  background-size: cover;
  margin-bottom: 50px;
  width: 200px;
  height: 200px;
`;

// Form
export const Form = styled.form`
  ${flexCenterColumn};
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
`;

export const Input = styled.input`
  ${inputStyles};
  width: 300%;
`;

export const Select = styled.select`
  ${inputStyles};
  width: 300%;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #8b008b;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  align-self: flex-end;

  &:hover {
    background-color: #8C7BB6 ;
  }
`;

export const UploadButton = styled.div`
  display: inline-block;
  background-color: #4caf50;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  label {
    font-size: 16px;
  }

  &:hover {
    background-color: #45a049;
  }
`;

// Table
export const StyledTable = styled.table`
  width: 100%;
  max-width: 1200px;
  border-collapse: collapse;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  th,
  td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }

  th {
    background-color: #f5f5f5;
    color: #333;
    font-weight: bold;
    text-transform: uppercase;
  }

  td {
    color: #555;
  }

  tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    th,
    td {
      padding: 0.5rem;
    }
  }
`;

export const TotalsContainer = styled.div`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;

  p {
    margin: 5px 0;
  }
`;

// Buttons
export const FavoriteButton = styled.button`
  background-color: #e0f4ff;
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b3e0ff;
  }

  svg {
    color: #1e90ff;
    font-size: 1.2rem;
  }
`;

// Cards
interface CardProps {
  bgColor: string;
}

export const Card = styled.div<CardProps>`
  background-color: ${(props) => props.bgColor || "#fff"};
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  text-align: center;
  margin: 1rem;
  height: 80px;
  font-size: 1.2rem;

  p {
    margin: 5px 0;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    min-width: 150px;
    height: auto;
    
  }
`;
