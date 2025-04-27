package com.cloud.phoenixia.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "당신의 API 이름",
                description = "API에 대한 설명",
                version = "v1.0.0"
        )
)
@Configuration
public class SwaggerConfig {
}