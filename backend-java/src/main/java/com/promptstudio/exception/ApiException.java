package com.promptstudio.exception;

public class ApiException extends RuntimeException {
    private final int statusCode;

    public ApiException(String message) {
        super(message);
        this.statusCode = 400; // default bad request
    }

    public ApiException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
