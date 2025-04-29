package com.cloud.phoenixia.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로 허용
                        .allowedOrigins("*") // 모든 Origin 허용 (필요시 특정 IP만)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS") // 허용 메소드
                        .allowedHeaders("*") // 모든 헤더 허용
                        .allowCredentials(false) // 쿠키 허용 여부
                        .maxAge(3600); // preflight 결과 캐시 시간(초)
            }
        };
    }
}