import { Injectable } from '@angular/core';
import { Recurso } from '../models/recurso.model';
import { Proyecto } from '../models/proyecto.model';
import { Notificacion } from '../models/notificacion.model';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db!: IDBDatabase;

  constructor() {}

  openDb(databaseName: string, version: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(databaseName, version);

      request.onerror = (event) => {
        console.error('Error opening database', event);
        reject();
      };

      request.onsuccess = (event) => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        this.db = request.result;

        if (!this.db.objectStoreNames.contains('recurso')) {
          const recursoStore = this.db.createObjectStore('recurso', {
            keyPath: 'id',
          });
        }

        if (!this.db.objectStoreNames.contains('proyecto')) {
          const proyectoStore = this.db.createObjectStore('proyecto', {
            keyPath: 'id',
          });
        }

        if (!this.db.objectStoreNames.contains('notificacion')) {
          const notificacionStore = this.db.createObjectStore('notificacion', {
            keyPath: 'id',
          });
        }
      };
    });
  }

  closeDb(): void {
    this.db.close();
  }
  
  addRecurso(recurso: Recurso): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('recurso', 'readwrite');
      const store = transaction.objectStore('recurso');
      const request = store.add(recurso);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }

  getAllRecursos(): Promise<Recurso[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('recurso', 'readonly');
      const store = transaction.objectStore('recurso');
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }

  getRecurso(id: number): Promise<Recurso> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('recurso', 'readonly');
      const store = transaction.objectStore('recurso');
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event);
    });
  }

  updateRecurso(recurso: Recurso): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('recurso', 'readwrite');
      const store = transaction.objectStore('recurso');
      const request = store.put(recurso);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }

  deleteRecurso(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('recurso', 'readwrite');
      const store = transaction.objectStore('recurso');
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event);
    });
  }
}
