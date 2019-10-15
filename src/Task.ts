// require с raw-loader загружает содержимое файла card.html в виде EcmaScript-модуля, поэтому нам нужно поле .default
// именно там будет строка с содержимым файла
let fileContent = require('raw-loader!./task.html').default;

// создаём HTML Element с помощью JQuery из строки (из строки создаём один раз, дальше будем его клонировать)
const html = $<Element>(fileContent);

export default class Task {

    private text: string;

    private date: Date;

    private element: JQuery<Element>;

    constructor(text: string, date: Date) {
        this.text = text;
        this.date = date;

        this.element = html.clone();

        this.element.find('.mb-1').text(text);
        this.element.find('.badge-pill').text(date.toLocaleString());
        this.element.find('.delete-button').click();
        let deleteBtn: JQuery<Element> = this.element.find('.delete-button');

        deleteBtn.click( _ => {
            this.element.remove();
        });
    }

    public addMe(root: JQuery<Element>) {
        root.append(this.element);
    }
}