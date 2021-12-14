export class Format {

    static getCamelCase(text) {

      let div = document.createElement('div');

      div.innerHTML = `<div data-${text}="id"></1>`;

        return Object.keys(div.firstChild.dataset)[0];


    }

    static toTime(duration){

        let seconds = parseInt((duration/1000) %60);
        let minutes = parseInt((duration/(1000 * 60)) %60);
        let hours = parseInt((duration/(1000 * 60 * 60)) %60);

        if(hours > 0) {
            return  `${hours} : ${minutes.toString().padStart(2,'0')} : ${seconds.toString().padStart(2,'0')}`;

        }else {
            return `${minutes} : ${seconds.toString().padStart(2,'0')}`;


        }

    }

    static dateTotime(date, locale = 'pt-BR'){

        return date.toLocaleTimeString(this._locale, {
            hour: '2-digit',
            minute: '2-digit'

        });

    }

    static timeStampToTime(timeStamp){

        return (timeStamp && typeof timeStamp.toDate === 'function') ?
         Format.dateTotime(timeStamp.toDate()) : '';

    }
    
}