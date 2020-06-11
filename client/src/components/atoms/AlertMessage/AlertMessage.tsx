import React, { FC } from "react";
import { Alert } from "react-bootstrap";

type variantTypes = "success" | "danger" | "warning" | "info";

const Notification: FC<{ message: string; variant: variantTypes }> = ({
    message = "Some error occurred",
    variant,
}) => <Alert variant={variant}>{message}</Alert>;

export default Notification;
