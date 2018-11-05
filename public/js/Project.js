class Project {
    constructor(project) {
        this.project.id = id;
        this.project.title = title;
        this.project.description = description;
        this.project.tags = tags;
        this.project.devTime = devTime;
        this.project.developers = developers;
        this.project.artists = artists;
        this.project.image = image;
        this.project.buttons = buttons;

        this.element = document.getElementById(this.id);
    }

    show() {
        this.element.classList.remove('hidden');
    }

    hide() {
        this.element.classList.add('hidden');
    }
}