.PHONY: db-exec
db-exec: 
	docker exec -it DCM-db mysql -h 127.0.0.1 -P 3306 -u root -proot -D DCM
	
.PHONY: db-model
db-model:
	for file in $$PWD/src/adapters/repositories/mysql/models/*.sql; do \
		fileName=$$(basename "$$file"); \
		echo "Executing SQL file: $$fileName"; \
		docker exec -it DCM-db sh -c "mysql -h 127.0.0.1 -P 3306 -u root -proot -D DCM < models/$$fileName"; \
	done

.PHONY: db-up
db-up:
	docker compose up --build -d

.PHONY: db-down
db-down:
	docker compose down || true

.PHONY: db-reset
db-reset:
	for file in $$PWD/src/adapters/repositories/mysql/resets/*.sql; do \
		fileName=$$(basename "$$file"); \
		echo "Executing SQL file: $$fileName"; \
		docker exec -it DCM-db sh -c "mysql -h 127.0.0.1 -P 3306 -u root -proot -D DCM < resets/\"$$fileName\""; \
	done

.PHONY: db-delete
db-delete:
	docker exec -it DCM-db sh -c "mysql -h 127.0.0.1 -P 3306 -u root -proot -Nse 'show tables from DCM' | xargs -I {} sh -c 'echo Deleting {} ...;mysql --host 127.0.0.1 --port 3306 -u root -proot -e \"TRUNCATE TABLE DCM.{}\"'"; \";

.PHONY: db-seed 
db-seed:
	for file in $$PWD/src/adapters/repositories/mysql/seeds/*.sql; do \
		fileName=$$(basename "$$file"); \
		echo "Executing SQL file: $$fileName"; \
		docker exec -it DCM-db sh -c "mysql -h 127.0.0.1 -P 3306 -u root -proot -D DCM < seeds/\"$$fileName\""; \
	done

.PHONY : display-port
display-port:
	sudo lsof -i :3306