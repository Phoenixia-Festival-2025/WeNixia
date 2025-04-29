package com.cloud.phoenixia.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String hello() {
        return "🎉 Spring Boot 프로젝트가 성공적으로 시작되었습니다!";
    }

    @GetMapping("/health")
    public String healthCheck() {
        return "OK";
    }
}