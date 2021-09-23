/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost:3306
 Source Schema         : bigevent

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 12/09/2021 14:47:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ev_users
-- ----------------------------
DROP TABLE IF EXISTS `ev_users`;
CREATE TABLE `ev_users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nickname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pic` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id_UNIQUE`(`id`) USING BTREE,
  UNIQUE INDEX `username_UNIQUE`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户信息表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of ev_users
-- ----------------------------
INSERT INTO `ev_users` VALUES (1, 'admin', '123123', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (2, 'zs', '123123', '张三', NULL, NULL);
INSERT INTO `ev_users` VALUES (3, 'ls', '123123', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (4, 'zjw', '$2a$10$FYJPEMynal/FmPxui4GSdeWDnR/Pfm3DC55JQoxQb1dQJ/QoHYuQe', '伟', 'asd@as.com', 'data:image/png;base64,VE9PTUFOWVNFQ1JFVFM=');
INSERT INTO `ev_users` VALUES (5, 'Tom', '$2a$10$X4/.911N2XLF3eD9uuqWVuC6apvVG5b2GZhPvRp1eZX0cPD/YQbKS', NULL, NULL, NULL);
INSERT INTO `ev_users` VALUES (6, 'cat', '$2a$10$BUVHcXD.VyLoIqloqesObuBV3jGbOwNquqLwKr0955KwpzmFIA7.y', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
