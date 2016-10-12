var TKN_Singleton = (function () {
    function TKN_Singleton() {
        if (TKN_Singleton.ms_instance)
            throw ("Use get Singleton.getInstance");
    }
    TKN_Singleton.getInstance = function () {
        if (TKN_Singleton.ms_instance)
            return TKN_Singleton.ms_instance;
        else
            return new TKN_Singleton();
    };
    return TKN_Singleton;
}());
//# sourceMappingURL=TKN_Singleton.js.map