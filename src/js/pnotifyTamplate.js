import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";


const errorWrongName = function () {
    error({
        text: "Please enter what you want to find.",
        delay: 2500,
        
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons:
                        [
                            {
                                text: "Ok",
                                primary: true,
                                click: notice => {
                                    notice.close();
                                }
                            }
                        ]
                }
            ]
        ])
    });
};





 const errorNoMorePictures = function () {
    error({
        text:
            "Sorry, it was the last page.",
        delay: 2500,
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                            text: "Ok",
                            primary: true,
                            click: notice => {
                                notice.close();
                            }
                        }
                    ]
                }
            ]
        ])
    });
};




const noPictures = function () {
    error({
        text:
            "Sorry, we cant find any pictures.",
        delay: 2500,
        modules: new Map([
            [
                Confirm,
                {
                    confirm: true,
                    buttons: [
                        {
                            text: "Ok",
                            primary: true,
                            click: notice => {
                                notice.close();
                            }
                        }
                    ]
                }
            ]
        ])
    });
};


export {noPictures, errorNoMorePictures, errorWrongName }