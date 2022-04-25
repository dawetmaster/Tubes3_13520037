import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const AlertError = ({ children }) => (
  <Alert status="error" variant="subtle">
    <AlertIcon />
    <AlertTitle mr={2}>Error</AlertTitle>
    <AlertDescription>{children}</AlertDescription>
  </Alert>
);

export default AlertError;