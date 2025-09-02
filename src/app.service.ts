import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpodateUserDto } from './dto/Update-user-dto';
import { promises as fs } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';


@Injectable()
export class AppService {
	getHello(): string {
		return 'Hello World!';
	}
}

@Injectable()
export class UsersService {

	private users = new Map<string, CreateUserDto & { id: string; createdAt?: string }>();
	private filePath = join(process.cwd(), 'users.json');

	/**
	 * Load users from users.json into the in-memory Map.
	 * If the file does not exist, create an empty array file.
	 */
	async onModuleInit(): Promise<void> {
		try {
			await this.loadUsers();
			console.log('UsersService: loaded', this.users.size, 'users from', this.filePath);
		} catch (err) {
			console.error('UsersService: failed to load users on init:', err);
		}
	}

	async loadUsers(): Promise<void> {
		try {
		const raw = await fs.readFile(this.filePath, 'utf8');
		const arr = JSON.parse(raw || '[]');
		console.table(arr);
		if (Array.isArray(arr)) {
			for (const u of arr) {
			if (u && typeof u.id === 'string') {
				this.users.set(u.id, u);
				}
			}
		}
		} catch (err: any) {
		if (err && err.code === 'ENOENT') {
			await fs.writeFile(this.filePath, '[]', 'utf8');
			return;
			}
			throw err;
		}
	}

	getUsers(): string
		{ return JSON.stringify(Array.from(this.users.values()));}

	getUser(id: string): CreateUserDto & { id: string; createdAt?: string } | undefined {
		return this.users.get(id);
	}

	createUser(dto: CreateUserDto): string {
		const id = randomUUID();
		const now = new Date().toISOString();
		this.users.set(id, { ...dto, id, createdAt: now });
		console.log('user data', {id, ...dto,  createdAt: now });
		return id;
	}

}