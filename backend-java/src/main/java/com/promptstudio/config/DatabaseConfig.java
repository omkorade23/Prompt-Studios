package com.promptstudio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
@ConditionalOnProperty(name = "spring.datasource.driver-class-name", havingValue = "org.postgresql.Driver")
public class DatabaseConfig {

    private static final Logger log = LoggerFactory.getLogger(DatabaseConfig.class);

    @Value("${spring.datasource.url:${DATABASE_URL:}}")
    private String rawUrl;

    @Value("${spring.datasource.username:${SPRING_DATASOURCE_USERNAME:}}")
    private String defaultUsername;

    @Value("${spring.datasource.password:${SPRING_DATASOURCE_PASSWORD:}}")
    private String defaultPassword;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        
        String url = rawUrl;
        String username = defaultUsername;
        String password = defaultPassword;

        if (url != null && !url.trim().isEmpty()) {
            url = url.trim();
            if (url.startsWith("postgresql+psycopg://")) {
                url = url.replace("postgresql+psycopg://", "postgresql://");
            }

            if (url.startsWith("postgres://") || url.startsWith("postgresql://")) {
                try {
                    String uriString = url.replaceFirst("^postgresql?://", "http://");
                    URI uri = new URI(uriString);

                    if (uri.getUserInfo() != null && !uri.getUserInfo().isEmpty()) {
                        String[] userInfo = uri.getUserInfo().split(":", 2);
                        username = userInfo[0];
                        if (userInfo.length > 1) {
                            password = userInfo[1];
                        }
                    }

                    String host = uri.getHost();
                    int port = uri.getPort() > 0 ? uri.getPort() : 5432;
                    String path = uri.getPath();
                    String query = uri.getQuery();

                    url = "jdbc:postgresql://" + host + ":" + port + path + (query != null ? "?" + query : "");
                    log.info("Parsed DATABASE_URL into JDBC URL: jdbc:postgresql://{}:{}{}", host, port, path);
                } catch (Exception e) {
                    log.warn("Failed to parse DATABASE_URL as URI, falling back to prefix replacement: {}", e.getMessage());
                    url = url.replaceFirst("^postgresql?://", "jdbc:postgresql://");
                }
            }
        }

        config.setJdbcUrl(url);
        if (username != null && !username.isEmpty()) {
            config.setUsername(username);
        }
        if (password != null && !password.isEmpty()) {
            config.setPassword(password);
        }
        config.setDriverClassName("org.postgresql.Driver");

        // Cloud Postgres pool settings (Neon)
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setIdleTimeout(300000);
        config.setConnectionTimeout(20000);

        return new HikariDataSource(config);
    }
}
