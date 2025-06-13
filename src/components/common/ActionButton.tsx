import React from 'react';
import styled from 'styled-components';
import Button from './Button';

// Stesso stile identico dei tuoi 3 componenti
const ActionButton = styled(Button)`
  align-self: flex-end;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  background-image: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  font-size: 1.25rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-transform: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary.dark};
    color: white;
  }

  &:focus, &:active {
    color: white;
  }

  svg {
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

export default ActionButton;