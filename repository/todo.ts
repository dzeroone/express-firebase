import { FirestoreRepo } from "../lib/firebase/firestore-repository";

type Task = {
  task: string;
  status?: number;
}

class TodoRepo extends FirestoreRepo {
  constructor() {
    super('todos')
  }
  async getAllByUser(userId?: string) {
    const query = await this.coll.where('userId', '==', userId).orderBy('cAt', 'desc').get();
    const docs: any[] = [];
    query.forEach((doc) => {
      docs.push({
        id: doc.id,
        ...doc.data()
      })
    })

    return docs;
  }
  async newTask(data: Task, userId?: string) {
    return this.coll.add({
      userId,
      task: data.task,
      cAt: Date.now()
    })
  }
  async updateTask(taskId: string, data: Task, userId?: string) {
    const taskSnap = await this.coll.doc(taskId).get();
    if(!taskSnap.exists) {
      throw new Error('Task not found!')
    }
    let task = taskSnap.data();
    if(task?.userId != userId) throw new Error('You are not author!')
    return this.coll.doc(taskId).update({
      task: data.task,
      uAt: Date.now()
    })
  }

  async removeTask(taskId: string, userId?: string) {
    const taskSnap = await this.coll.doc(taskId).get();
    if(!taskSnap.exists) {
      throw new Error('Task not found!')
    }
    let task = taskSnap.data();
    if(task?.userId != userId) throw new Error('You are not author!')
    
    return this.coll.doc(taskId).delete();
  }

  async updateTaskStatus(taskId: string, status: number, userId?: string) {
    const taskSnap = await this.coll.doc(taskId).get();
    if(!taskSnap.exists) {
      throw new Error('Task not found!')
    }
    let task = taskSnap.data();
    if(task?.userId != userId) throw new Error('You are not author!')
    return this.coll.doc(taskId).update({
      status: status,
      uAt: Date.now()
    })
  }
}

const todoRepo = new TodoRepo()

export default todoRepo;