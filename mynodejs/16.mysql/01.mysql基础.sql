SELECT * FROM my_db.users;

SELECT username,password FROM my_db.users;

INSERT INTO users(username,password) VALUES ('Jack','123123');

UPDATE users SET password='123456',status=1 WHERE id=2;

DELETE FROM users WHERE id=6;

SELECT * FROM users WHERE id<>1;
SELECT * FROM users WHERE id!=1;

SELECT * FROM users WHERE id<6 AND status=0;

SELECT * FROM users WHERE username='tom' OR status=1;

-- ORDER BY 默认按照升序(从小到大ASC),降序(DESC)
SELECT * FROM users ORDER BY status;
SELECT * FROM users ORDER BY id DESC;
SELECT * FROM users ORDER BY status DESC,username ASC;

-- COUNT(*)统计数量
SELECT COUNT(*) FROM users WHERE status=0;

-- 使用AS给列起别名
SELECT username AS name, password AS pwd FROM users;

