# Task_Management_System Parte Back-End
Projeto referente a disciplina de Desenvolvimento de Aplicações Corporativas (DAC): Sistema que gerencia as tarefas do dia a dia.

Inicialmente, este projeto foi criado por Jadson Anderson, um dos integrantes e líder da equipe, que, ao estar aprendendo mais sobre o framework Spring, começou a desenvolver o sistema, mais tarde, juntamente com os integrantes Carlos Henrique, Emanuel Lopes e John Herbert continuaram o desenvolvimento do sistema por um certo período, antes do professor desfazer todas as equipes e pedir que agora o desenvolvimento seria realizado de forma individual.

O sistema estará integrado com o banco de dados PostgreSQL, biblioteca front-end ReactJS, plataforma Docker, o padrão JWT, ferramenta Swagger ou Postman (como preferir) e a linguagem Java.


# Sistema de Gerenciamento de Tarefas

---

O sistema de gerenciamento de tarefas é uma aplicação web desenvolvida com o objetivo de auxiliar usuários no controle e organização de suas atividades diárias e profissionais. Permitindo o cadastro, visualização, atualização e exclusão de tarefas, além da categorização por prioridade, status e data de vencimento. A aplicação é modular, escalável e preparada para evolução, podendo ser usada tanto de forma individual quanto em ambientes colaborativos com múltiplos usuários.

## **Funcionalidades Principais**

1. ### **📋 Cadastro de Tarefas**

   * Crie novas tarefas informando título, descrição, data de vencimento, prioridade (baixa, média, alta) e status (pendente, em andamento, concluída).

   * Cada tarefa pode ser associada a uma categoria ou projeto.

2. ## **📂 Organização e Filtros**

   * Visualize suas tarefas organizadas por data, prioridade, status ou categoria.

   * Utilize filtros para encontrar rapidamente tarefas específicas.

3. ### **🔄 Atualização de Tarefas**

   * Edite qualquer tarefa para alterar seu status, prazos, descrição ou prioridade.

   * Marque tarefas como concluídas com apenas um clique.

4. ### **📆 Visão de Agenda**

   * Acompanhe suas tarefas em uma visualização de calendário para facilitar o planejamento da sua semana ou mês.

5. ### **🔔 Lembretes e Notificações**

   * Receba alertas automáticos sobre prazos de tarefas que estão próximas do vencimento.

6. ### **👥 Funcionalidades adicionais (A depender do cronograma da disciplina)**

   * Crie múltiplos usuários e permita o gerenciamento de tarefas em equipe (Gestão de Usuários).

   * Atribua tarefas a usuários diferentes e acompanhe o progresso de cada um (Gestão de Usuários).

   * Priorização automática de tarefas (com base em deadlines, urgência e impacto).
  
   * Integração com e-mail, Slack, Notion ou Google Calendar para importar tarefas e prazos.
  
   * Chat por tarefa ou projeto, com histórico
  
   * Quadros personalizados estilo Kanban com filtros avançados (por prioridade, prazo, responsável etc).
  
   * Relatórios de produtividade semanais/mensais.
  
   * Análise de tempo por categoria de tarefa (trabalho, estudos, pessoal etc).
  
   * Modo "offline-first", somente visualizar tarefa pessoal (em tarefas compartilhadas em equipe não deverá ser disponível essa opção)**.
  
   * Assistente virtual que sugere tarefas com base no contexto ("Você não concluiu tarefa X ontem, deseja movê-la para hoje?").
  
   * Gamificação: conquistas, níveis de produtividade, recompensas visuais.
  
   * Modo Pomodoro embutido com relatório de foco por sessão.
  
   * Sugerir redistribuição de tarefas** quando houver sobrecarga em membros da equipe.

---

## **Guia de uso do sistema**

1. ### **Criar uma Tarefa:**

   * Acesse a aba “Nova Tarefa” e preencha os campos obrigatórios.

   * Clique em “Salvar”.

2. ### **Editar ou Deletar:**

   * Na lista de tarefas, selecione a que deseja modificar.

   * Use os botões “Editar” ou “Excluir”.

3. ### **Filtrar Tarefas:**

   * Utilize o menu de filtros para selecionar por data, status ou prioridade.

4. ### **Visualização por Calendário:**

   * Vá até a aba “Agenda” para ver todas as tarefas organizadas cronologicamente.

---

### **❓ Dúvidas Frequentes**

* **Posso recuperar uma tarefa excluída?**  
  Atualmente, a exclusão é permanente. Use com cuidado.

* **Posso compartilhar tarefas com outras pessoas?**  
  Sim, se a funcionalidade de usuários estiver habilitada.

* **É possível acessar o sistema por dispositivos móveis?**  
  Sim, o sistema é responsivo e pode ser acessado por celulares e tablets.
---


# In English

# Task_Management_System Part Back-End
This project was developed as part of the Enterprise Application Development (DAC) course: a system designed to manage daily tasks efficiently.

Initially, the project was created by Jadson Anderson, the team leader, who started working on it while learning more about the Spring framework. Later, Carlos Henrique, Emanuel Lopes, and John Herbert joined the development process for a certain period. However, the professor eventually dissolved all teams and required each student to continue development individually.

The system will integrate with PostgreSQL for database management, ReactJS for the front-end, Docker for containerization, JWT for authentication, and tools like Swagger or Postman for API documentation and testing, all implemented using Java.

# Task Management System
The Task Management System is a web application designed to help users organize and manage their daily and professional activities. It allows users to create, view, update, and delete tasks, as well as categorize them by priority, status, and due date. The application is modular, scalable, and built for future expansion, suitable for both individual use and collaborative environments with multiple users.

## **Key Features**
1. ### **📋 Task Creation**
* Create new tasks by providing a title, description, due date, priority (low, medium, high), and status (pending, in progress, completed).

* Each task can be linked to a specific category or project.

2. ## **📂 Organization and Filtering**
* View tasks organized by date, priority, status, or category.

* Use filters to quickly locate specific tasks.

3. ### **🔄 Task Updates**
* Edit tasks to change their status, deadlines, descriptions, or priorities.

* Mark tasks as completed with a single click.

4. ### **📆 Calendar View**
* Track your tasks using a calendar view to better plan your week or month.

5. ### **🔔 Reminders and Notifications**
* Receive automatic alerts for tasks nearing their deadlines.

6. ### **👥 Additional Features (Depending on the Course Schedule)**
* Multi-user support and team task management (User Management).

* Assign tasks to different users and track their progress (User Management).

* Automatic task prioritization (based on deadlines, urgency, and impact).

* Integration with email, Slack, Notion, or Google Calendar (for task import and synchronization).

* Per-task or per-project chat (with message history).

* Customizable Kanban boards with advanced filtering (by priority, deadline, assignee, etc.).

* Weekly/monthly productivity reports.

* Time analysis by task category (e.g., work, study, personal).

* Offline-first mode (only available for personal tasks; shared tasks will require an internet connection).

* Virtual assistant that suggests actions (e.g., “You didn’t finish Task X yesterday — move it to today?”).

* Gamification (elements such as achievements, productivity levels, and visual rewards).

* Built-in Pomodoro timer (with session-based focus reports).

* Task redistribution suggestions (in case of team member overload).

## **System Usage Guide**
1. ### **Creating a Task**
* Go to the “New Task” tab and fill out the required fields.

* Click “Save”.

2. ### **Editing or Deleting a Task**
* From the task list, select the task you wish to modify.

* Use the “Edit” or “Delete” buttons accordingly.

3. ### **Filtering Tasks**
* Use the filter menu to sort tasks by date, status, or priority.

4. ### **Calendar View**
* Go to the “Calendar” tab to view all tasks organized chronologically.

---

### **❓ Frequently Asked Questions**
* **Can I recover a deleted task?**
  No. Deletion is permanent, so please use caution.

* **Can I share tasks with others?**
  Yes, if the user management feature is enabled.

* **Can I access the system from a mobile device?**
  Yes. The application is responsive and accessible on smartphones and tablets.
---
