// don't you just hate it when the api is so old and bad that
// IT NEEDS A GLOBAL VARIABLE ?
var chromaSDK = undefined;

class RazerChromaAPI {
    constructor() {
        this.FVTTOrange = 0x0064ff;

        this._init();
    }

    // we need to initialize the global variable and to add an event
    // to tell the RazerAPI that we will go to get milk from the closest shop
    // but we will be back soon enough
    _init() {
        chromaSDK = chromaSDK || new ChromaSDK();
        chromaSDK.init();
        this._staticBackground();

        window.addEventListener('beforeunload', () => {
            this._clearAllAnimations();
            this._uninit();
        });
    }

    // this tells the RazerAPI that we will be gone for milk
    // without this the RazerSynapse will wait for us 10 seconds
    // then assume we will be gone for milk
    _uninit() {
        if (typeof chromaSDK === 'undefined') return;
        chromaSDK.uninit();
    }

    // this clears all the nice colors... I hope...
    _clearAllAnimations() {
        if (typeof ChromaAnimation === 'undefined') return;
        ChromaAnimation.stopAll();
        ChromaAnimation.clearAll();
    }

    // a static animation with the foundry orange
    // this is EXTREMELY IMPORTANT, to not hurt the RazerAPI's feelings
    // we need to provide it with constant messages that we are here
    // and we will not leave...
    _staticBackground() {
        const staticColorAnimation = () => {
            ChromaAnimation.staticColor(
                EChromaSDKDeviceEnum.DE_Keyboard,
                this.FVTTOrange
            );
        };

        // this is needed because... reasons... one of them being
        // that the init function DOESN'T TELL ME WHEN IT'S DONE!
        // what year is it? 1990?
        setTimeout(staticColorAnimation , 3000);
    }
}