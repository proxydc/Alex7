<script>
import { ref } from "vue";
export default {
  props: {
    projects: [],
    maxILength: {
      type: Number,
      required: true,
    },
  },

  methods: {
    addRowTaskProject(index, len) {
      var container = document.getElementById("taskproj" + index);
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      newInput.maxLength = len; 
      container.appendChild(newInput);
    },
    addRowProjectPerso(len) {
      var newNode = document.getElementById("ghost_perso_project").cloneNode(true);
      newNode.querySelector(".dc-tasklist-perso").id =
        "proj_tasklist_" + xpAddedCounter.value;
      newNode.querySelector(".dc-taskinputlist-perso").id =
        "proj_taskinputlist_" + xpAddedCounter.value;
      newNode.querySelector(".dc-taskbutton-perso").id =
        "proj_taskbutton_" + xpAddedCounter.value;
      console.log("Add XP with id" + newNode.querySelector(".dc-tasklist-perso").id);
      newNode.id = "";
      newNode.style = "";
      newNode.classList = "project dc-tmp";
      document.getElementById("projects").appendChild(newNode);
      var button = document.getElementById("proj_taskbutton_" + xpAddedCounter.value);
      alert("counter: " + xpAddedCounter.value);
      var id = "proj_taskinputlist_" + xpAddedCounter.value;
      button.addEventListener("click", function () {
        alert("button was clicked id: " + id);
        var container = document.getElementById(id);
        var newInput = document.createElement("input");
        newInput.classList = "form-control dc-vlist dc-tmp";
        newInput.maxLength = len; 
        container.appendChild(newInput);
      })
      xpAddedCounter.value++;
      console.log(xpAddedCounter.value);
    },
  },
};
const xpAddedCounter = ref(0);

</script>

<template>
  <div>
    <div class="dc-section">
      <div class="col">
        <h5>Expériences personnelles</h5>
      </div>

      <div id="projects">
        <div class="project" v-for="(proj, index) in projects" :key="index">
          <div class="row">
            <div class="col col-4">
              <label for="">Période</label>
              <input type="text" class="form-control" aria-label="Période" :value="proj.period" />
            </div>
            <div class="col">
              <label for="">Titre</label>
              <input type="text" :value="proj.title" class="form-control" aria-label="Libellé du poste" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="context">Contexte</label>
              <textarea class="form-control" id="context" v-model="proj.context"></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col dc-tasklist">
              <label>Tâches</label>
              <div v-bind:id="`taskproj${index}`">
                <input v-for="(task, index) in proj.tasks" :value="task" :key="index" class="form-control dc-vlist" :maxlength="maxILength"
                  type="text" />
              </div>
              <button class="btn btn-outline-primary btn-sm" @click="addRowTaskProject(`${index}`, maxILength)">
                Ajouter une ligne
              </button>
            </div>
            <div class="col">
              <label for="envt">Environnement technique</label>
              <textarea class="form-control dc-ta-envt" v-model="proj.technical_env"></textarea>
            </div>
          </div>
        </div>

        <div class="project" id="ghost_perso_project" style="display: none; /* Template for new project perso */">
          <div class="row">
            <div class="col col-4">
              <label for="">Période</label>
              <input type="text" class="form-control" aria-label="Période"
                placeholder="Depuis 2022, durant 6 mois, ..." />
            </div>
            <div class="col">
              <label for="">Titre</label>
              <input type="text" name="" id="" class="form-control" aria-label="Libellé du poste" />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <label for="context">Contexte</label>
              <textarea class="form-control" placeholder="..." id="context"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col dc-tasklist-perso">
              <label for="">Tâches</label>
              <div class="dc-taskinputlist-perso">
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength"/>
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength"/>
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength" />
                <input class="form-control dc-vlist" type="text" placeholder="" aria-label="" :maxlength="maxILength"/>
              </div>
              <button class="btn btn-outline-primary btn-sm dc-taskbutton-perso">
                Ajouter une ligne
              </button>
            </div>
            <div class="col">
              <label for="envt">Environnement technique</label>
              <textarea class="form-control dc-ta-envt" placeholder="..."></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="row text-center">
        <div class="col">
          <button type="button" class="btn btn-outline-info btn-sm" @click="addRowProjectPerso(maxILength)">
            Nouvelle experience personnelle
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dc-ta-envt {
  height: 9rem;
  margin: 0.5rem 0rem;
}

.xp,
.project {
  margin-bottom: 4em;
}
</style>