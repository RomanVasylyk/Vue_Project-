<template>
  <v-container>
    <h1>Forum</h1>
    <v-btn @click="showCreateTopicDialog = true">Create New Topic</v-btn>

    <v-dialog v-model="showCreateTopicDialog">
      <v-card>
        <v-card-title>Create a new topic</v-card-title>
        <v-card-text>
          <v-text-field v-model="newTopicTitle" label="Topic Title"></v-text-field>
          <v-textarea v-model="newTopicDescription" label="Topic Description"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="createTopic">Create</v-btn>
          <v-btn @click="showCreateTopicDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-list>
      <v-list-item v-for="(topic, id) in forumTopics" :key="id" @click="openTopic(id)">
        <v-list-item-content>
          <v-list-item-title>{{ topic.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <!-- Dialog for the selected topic -->
    <v-dialog v-model="showTopicDialog" fullscreen>
      <v-card>
        <v-toolbar>
          <v-btn icon @click="showTopicDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ currentTopic.title }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <p>{{ currentTopic.description }}</p>
          <v-divider></v-divider>
          <div v-for="(message, index) in currentTopic.messages" :key="index">
            <p><strong>User:</strong> {{ getUserById(message.userId).name }}</p>
            <p>{{ message.content }}</p>
          </div>
          <v-divider></v-divider>
          <v-textarea v-model="newMessage" label="Your message" rows="3"></v-textarea>
          <v-btn @click="addMessage">Send</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  data() {
    return {
      showCreateTopicDialog: false,
      newTopicTitle: '',
      showTopicDialog: false,
      currentTopic: null,
      newMessage: '',
    };
  },
  computed: {
    forumTopics() {
      const authStore = useAuthStore();
      return authStore.forumTopics;
    }
  },
  methods: {
    createTopic() {
      const authStore = useAuthStore();
      const topicId = Date.now().toString();
      authStore.createTopic(topicId, this.newTopicTitle, this.newTopicDescription);
      this.newTopicTitle = '';
      this.newTopicDescription = '';
      this.showCreateTopicDialog = false;
    },
    openTopic(topicId) {
      const authStore = useAuthStore();
      this.currentTopic = { ...authStore.forumTopics[topicId], id: topicId };
      this.showTopicDialog = true;
    },
    getUserById(userId) {
      const authStore = useAuthStore();
      if (authStore.users) {
        return authStore.users.find(user => user.id === userId) || {};
      }
      return {};
    },



    addMessage() {
      const authStore = useAuthStore();
      if (this.newMessage.trim() && this.currentTopic) {
        const userId = authStore.user?.id;
        authStore.addMessageToTopic(this.currentTopic.id, this.newMessage, userId);
        this.newMessage = '';
        this.currentTopic = { ...this.currentTopic };
      }
    }

  },
  mounted() {
    const authStore = useAuthStore();
    authStore.initialize();
    authStore.loadForumTopicsFromLocalStorage();
    authStore.loadUsersFromLocalStorage();
  }
};
</script>
