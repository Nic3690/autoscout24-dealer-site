import React from 'react';
import styled from 'styled-components';
import Button from './Button';


const ActionButton = styled(Button)`
  align-self: flex-end;
  background: ${({ theme }) => theme.colors.primary.main} !important;
  background-image: none !important;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: white;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: none;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary.main} !important;
    background-image: none !important;
    color: white;
  }

  &:focus, &:active {
    background: ${({ theme }) => theme.colors.primary.main} !important;
    background-image: none !important;
    color: white;
  }

  svg {
    font-size: 0.8rem;
    margin-left: 8px;
  }
`;

export default ActionButton;