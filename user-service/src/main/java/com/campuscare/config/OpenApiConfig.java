package com.campuscare.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI campusCareOpenAPI() {

        return new OpenAPI()
                .info(
                        new Info()
                                .title("CampusCare User Service API")
                                .version("1.0")
                                .description(
                                        "REST API for CampusCare User Management"
                                )
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        "ApiKeyAuth",
                                        new SecurityScheme()
                                                .type(SecurityScheme.Type.APIKEY)
                                                .in(SecurityScheme.In.HEADER)
                                                .name("X-API-KEY")
                                                .description(
                                                        "Enter the User Service API Key"
                                                )
                                )
                );
    }
}