import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

export function AlertError(props) {
  return (
    <Alert status="error" variant="subtle">
      <AlertIcon />
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}

export function AlertSuccess(props) {
  return (
    <Alert status="success" variant="subtle">
      <AlertIcon />
      <AlertTitle mr={2}>Success</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}

export function AlertWarning(props) {
  return (
    <Alert status="warning" variant="subtle">
      <AlertIcon />
      <AlertTitle mr={2}>Warning</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}

export function AlertInfo(props) {
  return (
    <Alert status="info" variant="subtle">
      <AlertIcon />
      <AlertTitle mr={2}>Info</AlertTitle>
      <AlertDescription>{props.message}</AlertDescription>
    </Alert>
  );
}