const commonPropBom = [
  ["ESP32-S3 DevKit", "1", "Hshop / maker shop", "Bench"],
  ["MPU6050 IMU", "1", "Hshop / maker shop", "Bench"],
  ["Momentary button", "2", "Maker shop", "Bench"],
  ["WS2812B LED", "1 set", "Maker shop / marketplace", "Bench"],
  ["USB data cable", "1", "Computer shop", "Bench"],
  ["EVA foam sheets", "As cut plan", "Cosplay material shop", "Shell"]
];

const propKits = {
  guardian: {
    roleLabel: "GUARDIAN / DEFENCE", name: "Aegis Shield", kind: "shield", size: "Ø 500 mm",
    budget: "EST. 550K–1.2M VND",
    purpose: "A broad defensive controller that makes block direction, timing, acknowledgement, and team protection visible.",
    shell: "3-layer EVA, 45–55 cm, nylon arm straps", sensor: "MPU6050 + thumb trigger",
    core: "Removable rear-center module", events: "BLOCK_START · BLOCK_END · TAUNT",
    safety: "Rounded foam perimeter. No shield charge and no physical body contact.",
    callouts: ["10 mm EVA face", "ESP32 service box", "MPU6050 at centre", "Thumb trigger", "WS2812B rim", "Adjustable arm straps"],
    bom: [["10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Nylon strap + buckle", "2", "Sewing shop", "Shell"], ["Vibration motor", "1", "Maker shop", "Feedback"]],
    assembly: ["Print the 500 mm shield template and make a cardboard fit mock-up.", "Build and test ESP32, IMU, trigger, and one LED segment over USB.", "Cut and laminate the EVA layers; keep the service-box cavity open.", "Mount the IMU flat at the geometric centre with its axis arrow facing up.", "Install the thumb trigger under the dominant-hand grip.", "Route the LED rim through a protected channel and add a quick connector.", "Attach adjustable straps, close the removable rear cover, and calibrate neutral angle.", "Run 100 block raises and record false triggers before paint."]
  },
  warrior: {
    roleLabel: "WARRIOR / PRESSURE", name: "Pulse Sword", kind: "sword", size: "650 × 110 mm",
    budget: "EST. 450K–1.0M VND",
    purpose: "A short foam sword that sends deliberate swing intent only while its grip trigger is held.",
    shell: "Soft EVA blade, electronics confined to hilt", sensor: "MPU6050 + index trigger",
    core: "Hilt service cartridge", events: "STRIKE · HEAVY_STRIKE · PARRY",
    safety: "No metal or rigid full-length core. Performance gestures only; never strike another player.",
    callouts: ["Soft EVA blade", "Diffused LED spine", "IMU in guard", "Index trigger", "ESP32 hilt cartridge", "Wrist retention loop"],
    bom: [["5–10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Soft diffuser strip", "1", "Maker / craft shop", "Shell"], ["Wrist loop", "1", "Sewing shop", "Safety"]],
    assembly: ["Make a full-size cardboard silhouette and confirm the 650 mm length.", "Bench-test trigger-gated gesture detection over USB.", "Laminate the EVA blade without a metal or wooden core.", "Cut a protected LED channel along the spine.", "Mount the IMU in the guard, aligned with the blade direction.", "Build the removable hilt cartridge with ESP32 and connectors.", "Fit a wrist retention loop and close all hard edges under foam.", "Run 100 deliberate and 100 accidental motions; tune the gesture threshold."]
  },
  archer: {
    roleLabel: "ARCHER / RANGED", name: "Arc Bow", kind: "bow", size: "900 × 430 mm",
    budget: "EST. 650K–1.4M VND",
    purpose: "A no-projectile bow that measures draw and release, while Unity creates the virtual arrow and hit.",
    shell: "Light PVC/EVA limbs with low-tension elastic string", sensor: "Linear Hall sensor + magnet + IMU",
    core: "Central grip compartment", events: "DRAW_START · DRAW_READY · FIRE",
    safety: "No arrow, no launcher, and low string tension. The bow must never store projectile energy.",
    callouts: ["Foam-wrapped limb", "Low-tension draw cord", "Draw magnet", "Hall sensor slot", "ESP32 grip", "Limb status LEDs"],
    bom: [["Light PVC/EVA frame", "1", "Hardware + cosplay shop", "Shell"], ["Linear Hall sensor", "1", "Maker shop", "Input"], ["Small magnet", "1", "Maker shop", "Input"], ["Elastic draw cord", "1", "Craft shop", "Safety"]],
    assembly: ["Build a powerless foam/PVC bow mock-up and confirm comfortable reach.", "Bench-test the Hall sensor and magnet travel over USB.", "Set the draw cord to low tension; confirm it cannot launch any object.", "Install the Hall sensor inside the grip and the magnet on the draw slider.", "Mount the ESP32 in the central grip with a removable cover.", "Add diffused LEDs to the limbs without weakening the frame.", "Calibrate rest, ready, and release thresholds for three different users.", "Run 100 draws, including partial releases, and record missed or duplicate FIRE events."]
  },
  assassin: {
    roleLabel: "ASSASSIN / CONTROL", name: "Shade Daggers", kind: "dagger", size: "320 × 75 mm",
    budget: "EST. 450K–950K VND",
    purpose: "A paired visual set with electronics in the dominant dagger; trap placement remains virtual in the MVP.",
    shell: "Two short EVA daggers; one active and one passive", sensor: "MPU6050 + grip trigger",
    core: "Dominant-hand hilt", events: "QUICK_STRIKE · HEAVY_STRIKE · PLACE_TRAP",
    safety: "Short rounded foam blades. No thrust toward the head, torso, or another player.",
    callouts: ["Active EVA dagger", "Passive off-hand dagger", "IMU in active guard", "Grip trigger", "ESP32 active hilt", "Trap button / wrist pad"],
    bom: [["5–10 mm EVA sheet", "2", "Cosplay material shop", "Shell"], ["Wrist button pad", "1", "Maker + sewing shop", "Input"], ["Wrist retention loops", "2", "Sewing shop", "Safety"]],
    assembly: ["Make two 320 mm cardboard templates with fully rounded tips.", "Bench-test the active dagger and separate trap button over USB.", "Laminate both EVA bodies; keep only the dominant hilt serviceable.", "Align the IMU with the active blade direction.", "Install grip trigger, ESP32 cartridge, and wrist retention loop.", "Build the off-hand dagger as a passive lightweight prop.", "Map trap placement to an arena zone; do not place electronics on the floor yet.", "Test rapid combinations and verify one physical motion creates at most one event."]
  },
  mage: {
    roleLabel: "MAGE / SUPPORT", name: "Lumen Staff", kind: "staff", size: "1,100 × 140 mm",
    budget: "EST. 600K–1.3M VND",
    purpose: "A support staff with a luminous orb for healing, shielding, channeling, and revive intent.",
    shell: "Light PVC shaft fully wrapped in EVA; padded ends", sensor: "MPU6050 + CAST/SPECIAL buttons",
    core: "Lower grip for balance", events: "CAST_HEAL · CHANNEL · TEAM_SHIELD",
    safety: "Both ends padded. No spinning near other players and no ground impact.",
    callouts: ["Diffused LED orb", "Padded upper head", "CAST thumb button", "IMU below grip", "ESP32 lower grip", "Padded lower end"],
    bom: [["Light PVC tube", "1", "Hardware shop", "Shell"], ["EVA wrap + padding", "1 set", "Cosplay material shop", "Shell"], ["Diffused orb shell", "1", "Prop maker / 3D print", "Shell"], ["Vibration motor", "1", "Maker shop", "Feedback"]],
    assembly: ["Confirm 1.0–1.2 m length with the shortest expected player.", "Bench-test CAST, SPECIAL, IMU, orb LED, and haptic over USB.", "Wrap the shaft completely and pad both ends.", "Mount the orb with a removable diffuser and no exposed hard point.", "Place the IMU below the upper grip and align its forward axis.", "Install ESP32 and connectors in the lower grip to balance the orb.", "Calibrate pointing and channel posture for three users.", "Run heal, shield, and cancelled-channel scenarios before paint."]
  },
  boss: {
    roleLabel: "BOSS / RAID CONTROL", name: "Titan Warden Hammer", kind: "hammer", size: "1,150 × 360 mm",
    budget: "EST. 1.3M–3.0M VND",
    purpose: "A high-visibility two-handed boss controller paired with a three-zone LED armour vest and phase feedback.",
    shell: "Hollow EVA hammer head, foam-wrapped shaft, adjustable LED armour", sensor: "MPU6050 + two grip triggers",
    core: "Lower hammer grip + separate armour receiver", events: "SWEEP · SLAM · MARK · PHASE_SKILL",
    safety: "A hollow lightweight head, padded shaft, and zero-contact attacks. AoE exists only in Unity and arena cues.",
    callouts: ["Hollow EVA hammer head", "Head effect LEDs", "Primary trigger", "IMU at balance point", "ESP32 lower grip", "3-zone LED armour"],
    bom: [["10 mm EVA sheets", "3–4", "Cosplay material shop", "Shell"], ["Light PVC shaft", "1", "Hardware shop", "Shell"], ["Armour training bib", "1", "Sports shop", "Wearable"], ["LED armour panels", "3", "Maker + sewing shop", "Feedback"], ["Second receiver core", "1", "Maker shop", "Field"]],
    assembly: ["Build the hollow hammer head at full size and weigh it before electronics.", "Bench-test two triggers, IMU, and head LEDs over USB.", "Wrap the shaft in foam and pad both ends.", "Install the IMU at the balance point and the ESP32 in the lower grip.", "Create an open-side adjustable armour bib with removable LED panels.", "Pair hammer input and armour feedback under one boss session identity.", "Calibrate SWEEP, SLAM, and MARK without physical contact.", "Run a five-minute phase test and reject the build if heat, discomfort, or false attacks appear."]
  }
};

const propKitVi = {
  guardian: {
    roleLabel: "HỘ VỆ / PHÒNG THỦ", name: "Khiên Aegis",
    purpose: "Bộ điều khiển phòng thủ bản rộng, thể hiện rõ hướng đỡ, thời điểm đỡ, phản hồi và khả năng bảo vệ đồng đội.",
    shell: "EVA 3 lớp, 45–55 cm, quai đeo tay nylon", sensor: "MPU6050 + cò ngón cái",
    core: "Module tháo rời ở tâm mặt sau", events: "BẮT ĐẦU ĐỠ · KẾT THÚC ĐỠ · KHIÊU KHÍCH",
    safety: "Viền foam được bo tròn. Không lao khiên và không tiếp xúc cơ thể.",
    callouts: ["Mặt khiên EVA 10 mm", "Hộp bảo trì ESP32", "MPU6050 tại tâm", "Cò ngón cái", "LED WS2812B quanh viền", "Quai đeo tay điều chỉnh"],
    assembly: ["In mẫu khiên 500 mm và làm bản thử bằng bìa để kiểm tra độ vừa tay.", "Lắp thử ESP32, IMU, cò và một đoạn LED qua USB.", "Cắt rồi ép các lớp EVA; để mở khoang hộp bảo trì.", "Gắn IMU nằm phẳng tại tâm hình học, mũi tên trục hướng lên.", "Lắp cò ngón cái dưới tay cầm thuận.", "Đi dây LED trong rãnh bảo vệ và thêm đầu nối tháo nhanh.", "Gắn quai điều chỉnh, đóng nắp sau tháo rời và cân chỉnh góc trung tính.", "Thử 100 lần nâng khiên và ghi lại kích hoạt sai trước khi sơn."]
  },
  warrior: {
    roleLabel: "CHIẾN BINH / ÁP LỰC", name: "Kiếm Pulse",
    purpose: "Kiếm foam ngắn chỉ gửi ý định vung khi người chơi chủ động giữ cò ở tay cầm.",
    shell: "Lưỡi EVA mềm, điện tử chỉ nằm trong chuôi", sensor: "MPU6050 + cò ngón trỏ",
    core: "Hộp lõi tháo rời trong chuôi", events: "CHÉM · CHÉM MẠNH · ĐỠ ĐÒN",
    safety: "Không dùng kim loại hoặc lõi cứng chạy hết lưỡi. Chỉ biểu diễn động tác, không đánh người chơi khác.",
    callouts: ["Lưỡi EVA mềm", "Dải LED tán sáng", "IMU trong chắn tay", "Cò ngón trỏ", "Hộp ESP32 trong chuôi", "Dây giữ cổ tay"],
    assembly: ["Làm mẫu bìa đúng kích thước và xác nhận chiều dài 650 mm.", "Thử nhận động tác có giữ cò qua USB.", "Ép các lớp lưỡi EVA, không dùng lõi kim loại hoặc gỗ.", "Cắt rãnh LED có bảo vệ dọc sống kiếm.", "Gắn IMU trong chắn tay, thẳng theo hướng lưỡi kiếm.", "Lắp hộp ESP32 và đầu nối tháo rời trong chuôi.", "Thêm dây giữ cổ tay và phủ foam lên mọi cạnh cứng.", "Thử 100 động tác chủ ý và 100 chuyển động ngẫu nhiên để chỉnh ngưỡng."]
  },
  archer: {
    roleLabel: "CUNG THỦ / TẦM XA", name: "Cung Arc",
    purpose: "Cung không có tên, đo trạng thái kéo và thả; Unity tạo mũi tên ảo và quyết định trúng đích.",
    shell: "Cánh PVC/EVA nhẹ, dây đàn hồi lực thấp", sensor: "Hall tuyến tính + nam châm + IMU",
    core: "Khoang giữa tay cầm", events: "BẮT ĐẦU KÉO · SẴN SÀNG · BẮN",
    safety: "Không tên, không cơ chế phóng và dây có lực thấp. Cung không được tích năng lượng để phóng vật thể.",
    callouts: ["Cánh cung bọc foam", "Dây kéo lực thấp", "Nam châm theo dây kéo", "Khe cảm biến Hall", "ESP32 trong tay cầm", "LED trạng thái trên cánh"],
    assembly: ["Làm khung cung foam/PVC không điện và kiểm tra tầm với thoải mái.", "Thử hành trình Hall sensor và nam châm qua USB.", "Đặt dây kéo lực thấp; xác nhận không thể phóng bất kỳ vật thể nào.", "Gắn Hall sensor trong tay cầm và nam châm trên con trượt dây.", "Gắn ESP32 trong tay cầm giữa với nắp tháo rời.", "Thêm LED tán sáng vào cánh cung mà không làm yếu khung.", "Cân chỉnh vị trí nghỉ, sẵn sàng và thả cho ba người dùng.", "Thử 100 lần kéo, gồm cả thả nửa chừng, rồi ghi nhận sự kiện FIRE thiếu hoặc lặp."]
  },
  assassin: {
    roleLabel: "SÁT THỦ / KIỂM SOÁT", name: "Dao Shade",
    purpose: "Cặp dao hiển thị đồng bộ nhưng chỉ dao thuận có điện tử; bẫy vẫn là đối tượng ảo trong MVP.",
    shell: "Hai dao EVA ngắn; một chủ động, một thụ động", sensor: "MPU6050 + cò tay cầm",
    core: "Chuôi tay thuận", events: "ĐÁNH NHANH · ĐÁNH MẠNH · ĐẶT BẪY",
    safety: "Lưỡi foam ngắn, đầu bo tròn. Không đâm về phía đầu, thân hoặc người chơi khác.",
    callouts: ["Dao EVA chủ động", "Dao tay phụ thụ động", "IMU trong chắn dao", "Cò tay cầm", "ESP32 trong chuôi", "Nút bẫy đeo cổ tay"],
    assembly: ["Làm hai mẫu bìa dài 320 mm với đầu được bo tròn hoàn toàn.", "Thử dao chủ động và nút bẫy riêng qua USB.", "Ép hai thân EVA; chỉ để chuôi tay thuận có thể bảo trì.", "Căn IMU thẳng theo hướng lưỡi dao chủ động.", "Lắp cò tay cầm, hộp ESP32 và dây giữ cổ tay.", "Làm dao tay phụ thành prop thụ động nhẹ.", "Ánh xạ đặt bẫy vào ô đấu; chưa đặt điện tử xuống sàn.", "Thử combo nhanh và xác nhận một chuyển động chỉ tạo tối đa một sự kiện."]
  },
  mage: {
    roleLabel: "PHÁP SƯ / HỖ TRỢ", name: "Gậy Lumen",
    purpose: "Gậy hỗ trợ có quả cầu phát sáng cho hồi máu, tạo khiên, niệm phép và hồi sinh.",
    shell: "Ống PVC nhẹ bọc EVA toàn bộ; hai đầu có đệm", sensor: "MPU6050 + nút CAST/SPECIAL",
    core: "Tay cầm dưới để cân bằng", events: "HỒI MÁU · NIỆM PHÉP · KHIÊN ĐỘI",
    safety: "Hai đầu được đệm mềm. Không xoay gậy gần người khác và không đập xuống đất.",
    callouts: ["Quả cầu LED tán sáng", "Đầu trên bọc đệm", "Nút CAST ngón cái", "IMU dưới tay cầm", "ESP32 trong tay cầm dưới", "Đầu dưới bọc đệm"],
    assembly: ["Xác nhận chiều dài 1,0–1,2 m với người chơi thấp nhất dự kiến.", "Thử CAST, SPECIAL, IMU, LED quả cầu và rung qua USB.", "Bọc toàn bộ thân gậy và đệm mềm hai đầu.", "Gắn quả cầu bằng vỏ tán sáng tháo rời, không để điểm cứng lộ ra.", "Đặt IMU dưới tay cầm trên và căn trục trước.", "Lắp ESP32 cùng đầu nối ở tay cầm dưới để cân bằng quả cầu.", "Cân chỉnh hướng chỉ và tư thế niệm phép cho ba người.", "Chạy các tình huống hồi máu, tạo khiên và hủy niệm trước khi sơn."]
  },
  boss: {
    roleLabel: "BOSS / KIỂM SOÁT TRẬN", name: "Búa Titan Warden",
    purpose: "Bộ điều khiển Boss hai tay dễ nhận diện, kết hợp áo giáp LED ba vùng và phản hồi chuyển phase.",
    shell: "Đầu búa EVA rỗng, cán bọc foam, áo giáp LED điều chỉnh", sensor: "MPU6050 + hai cò tay cầm",
    core: "Tay cầm dưới + bộ nhận riêng trên áo", events: "QUÉT · ĐẬP VÙNG · ĐÁNH DẤU · KỸ NĂNG PHASE",
    safety: "Đầu rỗng nhẹ, cán bọc đệm và mọi đòn đánh đều không tiếp xúc. AoE chỉ tồn tại trong Unity và tín hiệu sân.",
    callouts: ["Đầu búa EVA rỗng", "LED hiệu ứng đầu búa", "Cò chính", "IMU tại điểm cân bằng", "ESP32 tay cầm dưới", "Áo giáp LED ba vùng"],
    assembly: ["Làm đầu búa rỗng đúng kích thước và cân khối lượng trước khi gắn điện tử.", "Thử hai cò, IMU và LED đầu búa qua USB.", "Bọc foam quanh cán và đệm mềm hai đầu.", "Gắn IMU tại điểm cân bằng và ESP32 ở tay cầm dưới.", "Tạo áo bib mở hai bên với các tấm LED tháo rời.", "Ghép input búa và phản hồi áo vào cùng một định danh phiên Boss.", "Cân chỉnh SWEEP, SLAM và MARK mà không có tiếp xúc cơ thể.", "Chạy thử phase trong năm phút; loại bản dựng nếu nóng, khó chịu hoặc kích hoạt sai."]
  }
};

const staticTranslations = {
  ".brand-copy span": ["ESP32 prototype workspace", "Không gian thử nghiệm ESP32"],
  ".mode-tabs [data-view='event-kit']": ["01 Event kit", "01 Bộ thiết bị"],
  ".mode-tabs [data-view='prototype']": ["02 Prototype", "02 Mẫu thử"],
  ".mode-tabs [data-view='field']": ["03 Field simulator", "03 Mô phỏng trận"],
  ".mode-tabs [data-view='build']": ["04 Spell Orb build", "04 Lắp Spell Orb"],
  "#event-kit .section-heading .eyebrow": ["ATLAS EVENT KIT V1 / 1 BOSS VS 4 HEROES", "ATLAS EVENT KIT V1 / 1 BOSS ĐẤU 4 HERO"],
  "#event-kit-title": ["Prop build planner", "Trình lập kế hoạch đạo cụ"],
  "#event-kit .section-note": ["The roster contains five hero kits. Load any four heroes plus Titan Warden for a match.", "Danh sách có năm bộ Hero. Mỗi trận chọn bốn Hero cùng Titan Warden."],
  ".kit-status-grid div:nth-child(1) span": ["role build packs", "bộ thiết kế theo role"],
  ".kit-status-grid div:nth-child(2) span": ["minimum play zone", "khu chơi tối thiểu"],
  ".kit-status-grid div:nth-child(3) span": ["match target", "thời lượng trận"],
  ".kit-status-grid div:nth-child(4) span": ["MVP: five players + hub", "MVP: năm người + hub"],
  ".blueprint-panel .panel-label": ["Numbered assembly drawing", "Bản vẽ lắp ráp đánh số"],
  ".blueprint-scale small": ["Concept dimensions — verify on the first foam mock-up", "Kích thước ý tưởng — cần xác minh bằng mẫu foam đầu tiên"],
  ".spec-stack div:nth-child(1) span": ["Shell", "Vỏ đạo cụ"],
  ".spec-stack div:nth-child(2) span": ["Sensor", "Cảm biến"],
  ".spec-stack div:nth-child(3) span": ["Core location", "Vị trí lõi"],
  ".spec-stack div:nth-child(4) span": ["Game events", "Sự kiện game"],
  ".safety-note strong": ["Physical rule", "Quy tắc vật lý"],
  "#downloadBuildPack": ["Download role build pack", "Tải bộ hướng dẫn role"],
  ".procurement-panel .panel-label": ["What to buy", "Cần mua gì"],
  ".procurement-panel thead th:nth-child(1)": ["Part", "Linh kiện"],
  ".procurement-panel thead th:nth-child(2)": ["Qty", "SL"],
  ".procurement-panel thead th:nth-child(3)": ["Source", "Nguồn mua"],
  ".procurement-panel thead th:nth-child(4)": ["Stage", "Giai đoạn"],
  ".role-assembly-panel .panel-label": ["Assembly path", "Lộ trình lắp ráp"],
  "#guidedBuildEyebrow": ["PARTS READY / GUIDED ASSEMBLY", "ĐỦ LINH KIỆN / HƯỚNG DẪN LẮP"],
  "#guided-build-title": ["Build it one verified step at a time", "Lắp từng bước và kiểm tra trước khi tiếp tục"],
  "#guidedBuildIntro": ["The final drawing stays visible above. The numbered callout for the current operation is highlighted.", "Bản vẽ hoàn chỉnh luôn hiển thị phía trên; vị trí của bước hiện tại sẽ được làm nổi bật."],
  "#partsReadyLabel": ["I have checked all required parts", "Tôi đã kiểm tra đủ linh kiện"],
  "#guidedPartsHeading": ["Parts for this step", "Linh kiện dùng ở bước này"],
  "#guidedActionHeading": ["Do this", "Thao tác cần làm"],
  "#guidedResultHeading": ["Expected result", "Kết quả mong đợi"],
  "#guidedPassHeading": ["PASS before continuing", "Điều kiện PASS để tiếp tục"],
  "#guidedPrev": ["Previous step", "Bước trước"],
  "#guidedComplete": ["Mark step complete", "Đánh dấu hoàn thành"],
  "#guidedNext": ["Next step", "Bước tiếp"],
  ".supplier-links a:nth-child(1)": ["ESP32-S3 source", "Nguồn mua ESP32-S3"],
  ".supplier-links a:nth-child(2)": ["MPU6050 source", "Nguồn mua MPU6050"],
  ".supplier-links a:nth-child(3)": ["EVA material source", "Nguồn mua EVA"],
  ".supplier-links a:nth-child(4)": ["Hanoi prop shop", "Cửa hàng đạo cụ Hà Nội"],
  ".supplier-links a:nth-child(5)": ["Cosplay marketplace", "Chợ đồ cosplay"],
  ".procurement-panel .fine-print": ["Supplier links are references, not locked SKUs. Recheck stock, dimensions, shipping, and seller reliability before purchase.", "Các link chỉ là nguồn tham khảo, chưa khóa SKU. Hãy kiểm tra lại tồn kho, kích thước, phí giao và độ uy tín trước khi mua."],
  ".kit-boundary div:nth-child(1) strong": ["What this planner proves", "Tool hiện chứng minh được"],
  ".kit-boundary div:nth-child(1) p": ["Role geometry, component placement, purchase categories, event names, and ordered assembly.", "Hình dạng role, vị trí linh kiện, nhóm đồ cần mua, tên sự kiện và thứ tự lắp ráp."],
  ".kit-boundary div:nth-child(2) strong": ["What still needs human proof", "Phần vẫn cần người thật xác minh"],
  ".kit-boundary div:nth-child(2) p": ["Real measurements, comfort, impact safety, battery heat, radio range, false gestures, and Unity integration.", "Kích thước thật, độ thoải mái, an toàn va chạm, nhiệt pin, sóng, nhận nhầm động tác và tích hợp Unity."],
  "#prototype-title": ["Spell Orb Controller", "Bộ điều khiển Spell Orb"],
  "#prototype .section-heading .eyebrow": ["VERTICAL SLICE / HERO INPUT", "LÁT CẮT THỬ NGHIỆM / INPUT HERO"],
  "#prototype .section-note": ["Configure one prop, inspect every pin, then export a Wokwi circuit.", "Cấu hình một đạo cụ, kiểm tra từng chân rồi xuất mạch Wokwi."],
  "#prototype .controls-panel > .panel-label": ["Device configuration", "Cấu hình thiết bị"],
  "label[for='roleSelect']": ["Hero role", "Role Hero"],
  "label[for='transportSelect']": ["Event transport", "Kênh truyền sự kiện"],
  ".controls-panel .switch-row:nth-child(6) strong": ["LED ring", "Vòng LED"],
  ".controls-panel .switch-row:nth-child(6) small": ["Cooldown and acknowledgement", "Cooldown và xác nhận"],
  ".controls-panel .switch-row:nth-child(7) strong": ["Audio feedback", "Phản hồi âm thanh"],
  ".controls-panel .switch-row:nth-child(7) small": ["Short local confirmation tone", "Âm xác nhận ngắn tại thiết bị"],
  ".circuit-panel .panel-label": ["Circuit map", "Sơ đồ mạch"],
  ".map-panel > .panel-label": ["Pin contract", "Quy ước chân"],
  "#downloadDiagram": ["Download diagram.json", "Tải diagram.json"],
  "#downloadConfig": ["Download device config", "Tải cấu hình thiết bị"],
  ".download-stack a": ["Open Wokwi", "Mở Wokwi"],
  "#field-title": ["Field simulator", "Mô phỏng trận đấu"],
  "#field .section-heading .eyebrow": ["EVENT PATH / FAILURE TEST", "LUỒNG SỰ KIỆN / THỬ LỖI"],
  "#field .section-note": ["Test how an input feels when delivery is delayed or lost.", "Kiểm tra cảm giác khi tín hiệu bị trễ hoặc mất gói."],
  ".arena-stats span": ["Boss HP", "Máu Boss"],
  "#resetSim": ["Reset", "Đặt lại"],
  ".telemetry-panel > .panel-label": ["Network conditions", "Điều kiện mạng"],
  "label[for='latencyRange'] span": ["Latency", "Độ trễ"],
  "label[for='lossRange'] span": ["Packet loss", "Mất gói"],
  ".metric-grid div:nth-child(1) span": ["Sent", "Đã gửi"],
  ".metric-grid div:nth-child(2) span": ["Delivered", "Đã nhận"],
  ".metric-grid div:nth-child(3) span": ["Lost", "Bị mất"],
  ".metric-grid div:nth-child(4) span": ["Avg latency", "Trễ TB"],
  ".log-label": ["Event stream", "Luồng sự kiện"],
  "#build-title": ["Build pack", "Bộ hướng dẫn lắp"],
  "#build .section-heading .eyebrow": ["PHYSICAL BUILD / ONE UNIT", "LẮP PHẦN CỨNG / MỘT BỘ"],
  "#build .section-note": ["Buy after the circuit proof. Complete each step in order on the first unit.", "Chỉ mua sau khi mạch thử đạt. Làm đúng thứ tự trên thiết bị đầu tiên."],
  ".bom-panel .panel-label": ["Bill of materials", "Bảng vật tư"],
  ".bom-panel thead th:nth-child(1)": ["Part", "Linh kiện"],
  ".bom-panel thead th:nth-child(2)": ["Qty", "SL"],
  ".bom-panel thead th:nth-child(3)": ["Stage", "Giai đoạn"],
  ".bom-panel .fine-print": ["Ranges are planning values. Recheck listings before purchase. The first proof uses USB power.", "Khoảng giá chỉ để lập kế hoạch. Kiểm tra lại tin bán trước khi mua. Bản thử đầu dùng nguồn USB."],
  ".guide-panel .panel-label": ["32 step assembly", "Lắp ráp 32 bước"],
  "#clearChecklist": ["Clear checks", "Xóa đánh dấu"],
  ".download-row > div:first-child strong": ["Repository build pack", "Bộ lắp ráp trong repository"],
  ".download-row > div:first-child p": ["Firmware, Wokwi files, event contract, BOM, and full guide.", "Firmware, file Wokwi, quy ước sự kiện, BOM và hướng dẫn đầy đủ."],
  ".download-row a:nth-child(1)": ["Wokwi circuit", "Mạch Wokwi"],
  ".download-row a:nth-child(2)": ["ESP32 firmware", "Firmware ESP32"],
  ".download-row a:nth-child(3)": ["Assembly guide", "Hướng dẫn lắp"],
  "footer span:nth-child(2)": ["Planner revision 0.3 · guided build evidence, not field certification", "Bản 0.3 · hướng dẫn lắp, chưa phải chứng nhận sử dụng thực địa"]
};

const roleCardTranslations = {
  guardian: ["Guardian", "Shield", "Hộ vệ", "Khiên"],
  warrior: ["Warrior", "Sword", "Chiến binh", "Kiếm"],
  archer: ["Archer", "Bow", "Cung thủ", "Cung"],
  assassin: ["Assassin", "Daggers", "Sát thủ", "Dao găm"],
  mage: ["Mage", "Staff", "Pháp sư", "Gậy phép"],
  boss: ["Titan Warden", "Boss hammer", "Titan Warden", "Búa Boss"]
};

let activeProp = "guardian";
let activeAssemblyStep = 0;
let currentLanguage = ["vi", "en"].includes(localStorage.getItem("atlas-language")) ? localStorage.getItem("atlas-language") : "vi";

const roles = {
  guardian: { label: "GUARDIAN", color: "#f0b44d", cast: { damage: 8 }, special: { shield: 25 } },
  archer: { label: "ARCHER", color: "#16a6c9", cast: { damage: 18 }, special: { damage: 34 } },
  assassin: { label: "ASSASSIN", color: "#7057d9", cast: { damage: 14 }, special: { damage: 42 } },
  support: { label: "SUPPORT", color: "#39cc93", cast: { heal: 8 }, special: { heal: 22 } }
};

const pinMap = [
  { pin: "GPIO25", name: "CAST button", color: "#16a6c9", optional: false },
  { pin: "GPIO26", name: "SPECIAL button", color: "#7057d9", optional: false },
  { pin: "GPIO18", name: "LED data", color: "#f0b44d", optional: "led" },
  { pin: "GPIO27", name: "Buzzer signal", color: "#f29f4b", optional: "buzzer" },
  { pin: "VIN", name: "5V feedback power", color: "#e05858", optional: "feedback" },
  { pin: "GND", name: "Shared ground", color: "#718088", optional: false }
];

const pinNamesVi = {
  "CAST button": "Nút CAST", "SPECIAL button": "Nút SPECIAL", "LED data": "Dữ liệu LED",
  "Buzzer signal": "Tín hiệu buzzer", "5V feedback power": "Nguồn phản hồi 5V", "Shared ground": "GND chung"
};

const bom = [
  ["ESP32 DevKit V1, 30 pin", "1", "Bench"], ["WS2812B 16 LED ring", "1", "Bench"],
  ["12 mm momentary button", "2", "Bench"], ["Passive piezo buzzer", "1", "Bench"],
  ["74AHCT125 level shifter", "1", "Bench"], ["330 Ω resistor", "1", "Bench"],
  ["1000 µF capacitor", "1", "Bench"], ["Half size breadboard", "1", "Bench"],
  ["Dupont jumper set", "1", "Bench"], ["USB data cable", "1", "Bench"],
  ["5V USB power bank", "1", "Field"], ["Prototype enclosure", "1", "Field"],
  ["USB power meter", "1", "Recommended"]
];

const guideSteps = [
  "Check every item against the bill of materials.", "Confirm the ESP32 is a 30 pin DevKit V1 board.",
  "Use USB power only for the first build.", "Keep the ESP32 disconnected while wiring.",
  "Place the ESP32 across the breadboard center gap.", "Identify VIN, 3V3, GND, GPIO18, GPIO25, GPIO26, and GPIO27.",
  "Mark the CAST and SPECIAL buttons.", "Place both buttons across the breadboard center gap.",
  "Connect one CAST contact to GPIO25.", "Connect the opposite CAST contact to GND.",
  "Connect one SPECIAL contact to GPIO26.", "Connect the opposite SPECIAL contact to GND.",
  "Check that neither button connects VIN to GND.", "Confirm the firmware uses INPUT_PULLUP for both buttons.",
  "Place the passive buzzer on the breadboard.", "Connect buzzer positive to GPIO27.",
  "Connect buzzer negative to GND.", "Place the 74AHCT125 level shifter across the center gap.",
  "Connect level shifter VCC to VIN and GND to GND.", "Tie the selected channel enable pin low.",
  "Connect GPIO18 to the selected level shifter input.", "Connect its matching output through 330 Ω to LED ring DIN.",
  "Connect LED ring VCC to VIN.", "Connect LED ring GND to GND.",
  "Place the 1000 µF capacitor across ring VCC and GND, matching polarity.", "Compare every wire with the pin table before connecting USB.",
  "Check for loose strands and accidental shorts.", "Connect the ESP32 with a data capable USB cable.",
  "Build and upload firmware/spell-orb with PlatformIO.", "Open serial monitor at 115200 baud and wait for ATLAS_PROP_READY.",
  "Press CAST, then SPECIAL; verify JSON, light, sound, and cooldown.", "Disconnect USB, label the revision, and record any difference before enclosure work."
];

const guideStepsVi = [
  "Đối chiếu từng món với bảng vật tư.", "Xác nhận ESP32 là board DevKit V1 loại 30 chân.",
  "Chỉ dùng nguồn USB cho bản lắp đầu tiên.", "Ngắt ESP32 khỏi nguồn trong lúc đi dây.",
  "Đặt ESP32 bắc qua rãnh giữa breadboard.", "Xác định VIN, 3V3, GND, GPIO18, GPIO25, GPIO26 và GPIO27.",
  "Đánh dấu nút CAST và SPECIAL.", "Đặt hai nút bắc qua rãnh giữa breadboard.",
  "Nối một chân CAST vào GPIO25.", "Nối chân CAST đối diện vào GND.",
  "Nối một chân SPECIAL vào GPIO26.", "Nối chân SPECIAL đối diện vào GND.",
  "Kiểm tra không nút nào nối tắt VIN với GND.", "Xác nhận firmware dùng INPUT_PULLUP cho cả hai nút.",
  "Đặt buzzer thụ động lên breadboard.", "Nối cực dương buzzer vào GPIO27.",
  "Nối cực âm buzzer vào GND.", "Đặt IC chuyển mức 74AHCT125 bắc qua rãnh giữa.",
  "Nối VCC của IC chuyển mức vào VIN và GND vào GND.", "Kéo chân enable của kênh được chọn xuống mức thấp.",
  "Nối GPIO18 vào đầu vào kênh đã chọn.", "Nối đầu ra tương ứng qua điện trở 330 Ω tới DIN của vòng LED.",
  "Nối VCC vòng LED vào VIN.", "Nối GND vòng LED vào GND.",
  "Đặt tụ 1000 µF giữa VCC và GND của vòng LED, đúng cực.", "So từng dây với bảng chân trước khi cắm USB.",
  "Kiểm tra sợi dây lỏng và nguy cơ chập mạch.", "Kết nối ESP32 bằng cáp USB có truyền dữ liệu.",
  "Build và nạp firmware/spell-orb bằng PlatformIO.", "Mở Serial Monitor 115200 baud và đợi ATLAS_PROP_READY.",
  "Nhấn CAST rồi SPECIAL; kiểm tra JSON, ánh sáng, âm thanh và cooldown.", "Rút USB, dán nhãn phiên bản và ghi lại sai khác trước khi làm vỏ."
];

const guidedCallouts = {
  guardian: [[1], [2, 3, 4, 5], [1], [3], [4], [5], [2, 6], [1, 2, 3, 4, 5, 6]],
  warrior: [[1, 6], [3, 4, 5], [1], [2], [3], [4, 5], [6], [1, 2, 3, 4, 5, 6]],
  archer: [[1, 2], [3, 4, 5], [2], [3, 4], [5], [1, 6], [3, 4], [1, 2, 3, 4, 5, 6]],
  assassin: [[1, 2], [3, 4, 5, 6], [1, 2], [3], [4, 5], [2], [6], [1, 2, 3, 4, 5, 6]],
  mage: [[1, 2, 6], [1, 3, 4, 5], [2, 6], [1], [4], [5], [3, 4], [1, 2, 3, 4, 5, 6]],
  boss: [[1], [2, 3, 4, 5], [1], [4, 5], [6], [2, 5, 6], [3, 4], [1, 2, 3, 4, 5, 6]]
};

const guidedCopy = {
  en: {
    titles: ["Make a full-size fit mock-up", "Prove the electronics over USB", "Build the safe outer shell", "Install and align the motion sensor", "Install controls and removable wiring", "Install protected light feedback", "Close the serviceable wearable structure", "Calibrate and complete the abuse test"],
    results: ["A powerless mock-up that shows size, reach, grip and clearance before any expensive work.", "Each input appears once in Serial Monitor and the LEDs respond without resets or hot parts.", "A light, rounded body with no exposed rigid point and an open service cavity.", "The sensor cannot shift; its axes match the direction shown on the drawing.", "Every control is reachable, strain-relieved and disconnects without cutting a wire.", "Light is visible through a diffuser; wires cannot be pinched during normal use.", "The prop fits the intended users, stays adjustable and opens again for repair.", "A labelled revision with recorded test results and no unresolved safety failure."],
    passes: ["Three intended users can hold or wear it comfortably; no edge reaches the face during the planned motion.", "100 input presses/motions produce no duplicate event, brownout, short, or component above hand-warm temperature.", "Drop from 30 cm onto a mat: no exposed hard edge, loose laminate, or cracked load point.", "At rest the reading is stable; three repeated motions point in the same signed axis direction.", "Pull each wire gently and operate every control 30 times with no intermittent event.", "Run full brightness for 10 minutes: diffuser remains secure and the service area stays safe to touch.", "Fit the shortest and largest expected player for five minutes without numbness, slipping, or blocked quick removal.", "Complete the role's final motion count with no physical contact, no false event above the recorded threshold, and no heat or discomfort."],
    parts: [
      ["Full-size paper template", "Cardboard", "Ruler / tape measure", "Marker and low-tack tape"],
      ["ESP32-S3", "Role sensor", "Buttons / triggers", "Breadboard, jumpers and USB data cable"],
      ["Specified shell material", "EVA-safe adhesive", "Cutting tools", "Eye and hand protection"],
      ["Motion / draw sensor", "Foam mounting pad", "Axis label", "Ruler or alignment guide"],
      ["Buttons / trigger", "Flexible wire", "Quick connectors", "Heat-shrink and strain relief"],
      ["WS2812B LEDs", "330 Ω resistor", "Diffuser", "Protected connector"],
      ["Service cover", "Straps / hook-and-loop", "Comfort padding", "Cable ties or fabric channels"],
      ["Laptop + Serial Monitor", "USB power meter", "Test log", "Second person as safety observer"]
    ]
  },
  vi: {
    titles: ["Làm mẫu thử đúng kích thước", "Chứng minh mạch điện qua USB", "Tạo lớp vỏ ngoài an toàn", "Gắn và căn cảm biến chuyển động", "Gắn nút điều khiển và dây tháo rời", "Gắn phản hồi ánh sáng có bảo vệ", "Đóng kết cấu đeo được nhưng vẫn bảo trì", "Cân chỉnh và hoàn tất thử độ bền"],
    results: ["Có mẫu không điện để kiểm tra kích thước, tầm với, tay cầm và khoảng trống trước khi tốn tiền.", "Mỗi input xuất hiện đúng một lần trên Serial Monitor; LED phản hồi, board không reset và không nóng bất thường.", "Có thân nhẹ, bo tròn, không lộ điểm cứng và vẫn chừa khoang bảo trì.", "Cảm biến không xê dịch; các trục đúng với hướng thể hiện trên bản vẽ.", "Mọi nút đều dễ bấm, dây có chống kéo và tháo được mà không phải cắt.", "Ánh sáng nhìn rõ qua lớp tán; dây không bị kẹp trong quá trình sử dụng.", "Đạo cụ vừa với nhóm người dùng dự kiến, điều chỉnh được và mở lại để sửa chữa.", "Có một phiên bản được dán nhãn, kèm kết quả thử và không còn lỗi an toàn chưa xử lý."],
    passes: ["Ba người dùng dự kiến cầm hoặc mặc thoải mái; không cạnh nào chạm mặt trong động tác đã định.", "100 lần bấm/chuyển động không tạo sự kiện lặp, sụt nguồn, chập mạch hoặc linh kiện nóng quá mức cầm tay.", "Thả từ 30 cm xuống thảm: không lộ cạnh cứng, không bong lớp và không nứt điểm chịu lực.", "Khi đứng yên số đo ổn định; ba lần lặp cùng động tác đều đi đúng một chiều trục.", "Kéo nhẹ từng dây và thao tác mỗi nút 30 lần, không có tín hiệu chập chờn.", "Chạy sáng tối đa 10 phút: lớp tán không rơi và khu vực bảo trì vẫn an toàn khi chạm.", "Cho người thấp nhất và lớn nhất dự kiến dùng 5 phút: không tê, không tuột và vẫn tháo nhanh được.", "Hoàn tất số lần thử cuối của role, không tiếp xúc cơ thể, không vượt ngưỡng nhận nhầm đã ghi và không nóng/khó chịu."],
    parts: [
      ["Mẫu giấy đúng kích thước", "Bìa carton", "Thước / thước dây", "Bút và băng dính giấy"],
      ["ESP32-S3", "Cảm biến của role", "Nút / cò", "Breadboard, dây cắm và cáp USB data"],
      ["Vật liệu vỏ theo thiết kế", "Keo an toàn cho EVA", "Dụng cụ cắt", "Bảo hộ mắt và tay"],
      ["Cảm biến chuyển động / kéo", "Đệm foam gắn cảm biến", "Nhãn trục", "Thước hoặc dưỡng căn"],
      ["Nút / cò", "Dây mềm", "Đầu nối tháo nhanh", "Ống co nhiệt và chống kéo"],
      ["LED WS2812B", "Điện trở 330 Ω", "Lớp tán sáng", "Đầu nối có bảo vệ"],
      ["Nắp bảo trì", "Quai / khóa dán", "Đệm êm", "Dây rút hoặc rãnh vải"],
      ["Laptop + Serial Monitor", "Đồng hồ đo nguồn USB", "Phiếu ghi thử nghiệm", "Một người giám sát an toàn"]
    ]
  }
};

const bomViTerms = {
  "MPU6050 IMU": "Cảm biến MPU6050", "Momentary button": "Nút nhấn nhả", "WS2812B LED": "LED WS2812B",
  "USB data cable": "Cáp USB data", "EVA foam sheets": "Tấm foam EVA", "Maker shop": "Cửa hàng linh kiện",
  "Hshop / maker shop": "Hshop / cửa hàng linh kiện", "Computer shop": "Cửa hàng máy tính", "Cosplay material shop": "Cửa hàng vật liệu cosplay",
  "Maker shop / marketplace": "Cửa hàng linh kiện / sàn TMĐT", "Bench": "Mạch thử", "Shell": "Vỏ", "Field": "Thực địa",
  "Feedback": "Phản hồi", "Safety": "An toàn", "Input": "Đầu vào", "Wearable": "Đồ mặc", "Recommended": "Khuyến nghị",
  "As cut plan": "Theo bản cắt", "1 set": "1 bộ", "10 mm EVA sheet": "Tấm EVA 10 mm", "10 mm EVA sheets": "Tấm EVA 10 mm",
  "5–10 mm EVA sheet": "Tấm EVA 5–10 mm", "Nylon strap + buckle": "Quai nylon + khóa", "Vibration motor": "Motor rung",
  "Soft diffuser strip": "Dải tán sáng mềm", "Wrist loop": "Dây giữ cổ tay", "Wrist retention loops": "Dây giữ cổ tay",
  "Light PVC/EVA frame": "Khung PVC/EVA nhẹ", "Linear Hall sensor": "Cảm biến Hall tuyến tính", "Small magnet": "Nam châm nhỏ",
  "Elastic draw cord": "Dây kéo đàn hồi", "Wrist button pad": "Đệm nút đeo cổ tay", "Light PVC tube": "Ống PVC nhẹ",
  "Light PVC shaft": "Cán PVC nhẹ", "EVA wrap + padding": "EVA bọc + đệm", "Diffused orb shell": "Vỏ cầu tán sáng",
  "Armour training bib": "Áo bib làm nền giáp", "LED armour panels": "Tấm LED giáp", "Second receiver core": "Lõi nhận tín hiệu thứ hai",
  "Sewing shop": "Cửa hàng may", "Maker / craft shop": "Cửa hàng linh kiện / thủ công", "Hardware + cosplay shop": "Cửa hàng vật tư + cosplay",
  "Craft shop": "Cửa hàng thủ công", "Maker + sewing shop": "Cửa hàng linh kiện + may", "Hardware shop": "Cửa hàng vật tư",
  "Prop maker / 3D print": "Xưởng đạo cụ / in 3D", "Sports shop": "Cửa hàng thể thao",
  "ESP32 DevKit V1, 30 pin": "ESP32 DevKit V1, 30 chân", "WS2812B 16 LED ring": "Vòng 16 LED WS2812B",
  "12 mm momentary button": "Nút nhấn nhả 12 mm", "Passive piezo buzzer": "Buzzer piezo thụ động", "74AHCT125 level shifter": "IC chuyển mức 74AHCT125",
  "330 Ω resistor": "Điện trở 330 Ω", "1000 µF capacitor": "Tụ 1000 µF", "Half size breadboard": "Breadboard nửa cỡ",
  "Dupont jumper set": "Bộ dây Dupont", "5V USB power bank": "Pin dự phòng USB 5V", "Prototype enclosure": "Hộp mẫu thử", "USB power meter": "Đồng hồ đo nguồn USB"
};

const state = {
  role: "archer", transport: "usb", led: true, buzzer: true,
  latency: 60, loss: 5, bossHp: 520, sent: 0, delivered: 0, lost: 0,
  latencyTotal: 0, sequence: 0, cooldown: { CAST: false, SPECIAL: false }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function blueprintSvg(kind) {
  const frame = (content, label) => `<svg viewBox="0 0 620 360" role="img" aria-label="${label} numbered concept assembly drawing">
    <defs><pattern id="bp-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#183541" stroke-width="1"/></pattern></defs>
    <rect width="620" height="360" fill="url(#bp-grid)"/>
    <g class="blueprint-object">${content}</g>
    <path class="dimension-line" d="M70 330H550 M70 322V338 M550 322V338"/>
  </svg>`;
  const dot = (n, x, y, tx, ty) => `<g class="bp-callout" data-callout="${n}"><path d="M${x} ${y}L${tx} ${ty}"/><circle cx="${x}" cy="${y}" r="13"/><text x="${x}" y="${y + 4}" text-anchor="middle">${n}</text></g>`;
  if (kind === "shield") return frame(`
    <path d="M310 35C420 35 485 83 476 174C467 264 398 306 310 320C222 306 153 264 144 174C135 83 200 35 310 35Z"/>
    <path d="M310 70C388 70 435 103 430 170C424 233 376 267 310 281C244 267 196 233 190 170C185 103 232 70 310 70Z"/>
    <circle cx="310" cy="171" r="52"/><path d="M236 116Q310 76 384 116M236 228Q310 268 384 228"/>
    ${dot(1,191,72,118,32)}${dot(2,310,171,520,104)}${dot(3,310,132,94,135)}${dot(4,388,210,530,238)}${dot(5,430,170,533,163)}${dot(6,240,225,104,273)}`, "Aegis Shield");
  if (kind === "sword") return frame(`
    <path d="M282 34L338 34L353 239L326 274H294L267 239Z"/><path d="M310 62V238"/>
    <path d="M225 250H395L378 279H242Z"/><rect x="291" y="273" width="38" height="64" rx="13"/><circle cx="310" cy="337" r="18"/>
    ${dot(1,284,75,118,48)}${dot(2,310,135,500,62)}${dot(3,342,250,520,190)}${dot(4,312,289,102,242)}${dot(5,310,314,496,302)}${dot(6,310,340,116,333)}`, "Pulse Sword");
  if (kind === "bow") return frame(`
    <path d="M194 45Q88 180 194 315M426 45Q532 180 426 315"/><path d="M194 45L310 180L194 315M426 45L310 180L426 315"/>
    <rect x="291" y="126" width="38" height="108" rx="12"/><path d="M310 92V268"/><circle cx="310" cy="180" r="10"/>
    ${dot(1,178,72,74,44)}${dot(2,310,92,500,46)}${dot(3,310,151,105,135)}${dot(4,310,180,520,176)}${dot(5,310,214,100,250)}${dot(6,430,92,526,112)}`, "Arc Bow");
  if (kind === "dagger") return frame(`
    <path d="M158 56L196 56L209 216L177 248L145 216Z"/><path d="M118 239H236L221 263H133Z"/><rect x="158" y="260" width="38" height="64" rx="12"/>
    <path d="M414 56L452 56L465 216L433 248L401 216Z"/><path d="M374 239H492L477 263H389Z"/><rect x="414" y="260" width="38" height="64" rx="12"/>
    ${dot(1,177,92,74,52)}${dot(2,433,92,548,46)}${dot(3,202,239,91,195)}${dot(4,177,278,80,288)}${dot(5,177,306,278,329)}${dot(6,433,306,545,302)}`, "Shade Daggers");
  if (kind === "staff") return frame(`
    <circle cx="310" cy="64" r="45"/><path d="M281 42L310 16L339 42M282 86L310 112L338 86"/>
    <path d="M294 108H326L320 318H300Z"/><rect x="287" y="138" width="46" height="92" rx="18"/>
    ${dot(1,310,64,494,42)}${dot(2,310,108,112,86)}${dot(3,330,154,504,135)}${dot(4,306,205,104,195)}${dot(5,307,246,508,255)}${dot(6,310,316,108,324)}`, "Lumen Staff");
  return frame(`
    <rect x="198" y="38" width="224" height="104" rx="34"/><path d="M230 62H390M230 117H390"/><path d="M290 142H330L324 329H296Z"/>
    <rect x="282" y="174" width="56" height="106" rx="19"/><path d="M450 185l55-28 55 28v72l-55 35-55-35z"/><path d="M470 205h70v42h-70z"/>
    ${dot(1,220,52,86,42)}${dot(2,382,91,538,67)}${dot(3,330,181,99,148)}${dot(4,310,148,505,132)}${dot(5,308,257,102,290)}${dot(6,505,220,554,300)}`, "Titan Warden Hammer and armour");
}

function localizedKit() {
  return currentLanguage === "vi"
    ? { ...propKits[activeProp], ...propKitVi[activeProp] }
    : propKits[activeProp];
}

function localizeBomCell(value) {
  return currentLanguage === "vi" ? (bomViTerms[value] || value) : value;
}

function applyStaticTranslations() {
  const index = currentLanguage === "vi" ? 1 : 0;
  document.documentElement.lang = currentLanguage;
  for (const [selector, values] of Object.entries(staticTranslations)) {
    const element = $(selector);
    if (element) element.textContent = values[index];
  }
  for (const [role, values] of Object.entries(roleCardTranslations)) {
    const card = $(`.role-card[data-prop="${role}"]`);
    if (!card) continue;
    card.querySelector("strong").textContent = values[index ? 2 : 0];
    card.querySelector("small").textContent = values[index ? 3 : 1];
  }
  $$(".language-switch button").forEach(button => button.classList.toggle("is-active", button.dataset.language === currentLanguage));
  const roleOptions = {
    guardian: ["Guardian", "Hộ vệ"], archer: ["Archer", "Cung thủ"], assassin: ["Assassin", "Sát thủ"], support: ["Support", "Hỗ trợ"]
  };
  for (const option of $$("#roleSelect option")) option.textContent = roleOptions[option.value][index];
  const transportOptions = {
    usb: ["USB serial · bench proof", "USB serial · thử trên bàn"],
    websocket: ["WiFi WebSocket · next proof", "WiFi WebSocket · thử tiếp theo"],
    espnow: ["ESP-NOW · field candidate", "ESP-NOW · ứng viên thực địa"]
  };
  for (const option of $$("#transportSelect option")) option.textContent = transportOptions[option.value][index];
  localStorage.setItem("atlas-language", currentLanguage);
}

function guidedStorageKey() { return `atlas-guided-${activeProp}`; }
function partsReadyStorageKey() { return `atlas-parts-ready-${activeProp}`; }

function getCompletedGuidedSteps() {
  try {
    const saved = JSON.parse(localStorage.getItem(guidedStorageKey()) || "[]");
    return Array.isArray(saved) ? saved.filter(value => Number.isInteger(value) && value >= 0 && value < 8) : [];
  } catch { return []; }
}

function renderGuidedAssembly() {
  const kit = localizedKit();
  const copy = guidedCopy[currentLanguage];
  const completed = getCompletedGuidedSteps();
  const callouts = guidedCallouts[activeProp][activeAssemblyStep];
  const ready = localStorage.getItem(partsReadyStorageKey()) === "true";

  $("#partsReadyCheck").checked = ready;
  $("#guidedStepNav").innerHTML = kit.assembly.map((_, index) => {
    const classes = [index === activeAssemblyStep ? "is-current" : "", completed.includes(index) ? "is-complete" : ""].filter(Boolean).join(" ");
    const label = currentLanguage === "vi" ? `Bước ${index + 1}` : `Step ${index + 1}`;
    return `<button type="button" data-guided-step="${index}" class="${classes}" aria-label="${label}"><span>${String(index + 1).padStart(2, "0")}</span><small>${copy.titles[index]}</small></button>`;
  }).join("");
  $("#guidedStepIndex").textContent = currentLanguage === "vi" ? `BƯỚC ${String(activeAssemblyStep + 1).padStart(2, "0")} / 08` : `STEP ${String(activeAssemblyStep + 1).padStart(2, "0")} / 08`;
  $("#guidedStepLocation").textContent = `${currentLanguage === "vi" ? "VỊ TRÍ BẢN VẼ" : "DRAWING"} ${callouts.map(value => String(value).padStart(2, "0")).join(" + ")}`;
  $("#guidedStepTitle").textContent = copy.titles[activeAssemblyStep];
  $("#guidedStepParts").innerHTML = copy.parts[activeAssemblyStep].map(item => `<li>${item}</li>`).join("");
  $("#guidedStepAction").textContent = kit.assembly[activeAssemblyStep];
  $("#guidedStepResult").textContent = copy.results[activeAssemblyStep];
  $("#guidedStepPass").textContent = copy.passes[activeAssemblyStep];
  $("#guidedProgress").style.width = `${completed.length / 8 * 100}%`;
  $("#guidedProgressText").textContent = currentLanguage === "vi" ? `${completed.length} / 8 hoàn thành` : `${completed.length} / 8 complete`;
  $("#guidedPrev").disabled = activeAssemblyStep === 0;
  $("#guidedNext").disabled = activeAssemblyStep === 7;
  $("#guidedComplete").disabled = !ready;
  $("#guidedComplete").classList.toggle("is-complete", completed.includes(activeAssemblyStep));
  $("#guidedComplete").textContent = completed.includes(activeAssemblyStep)
    ? (currentLanguage === "vi" ? "Bỏ đánh dấu hoàn thành" : "Undo completion")
    : (currentLanguage === "vi" ? "Đánh dấu hoàn thành" : "Mark step complete");
  $$(".bp-callout").forEach(node => node.classList.toggle("is-highlighted", callouts.includes(Number(node.dataset.callout))));
  $$("#propCallouts > div").forEach((node, index) => node.classList.toggle("is-highlighted", callouts.includes(index + 1)));
}

function renderPropKit() {
  const kit = localizedKit();
  document.documentElement.style.setProperty("--kit-accent", activeProp === "boss" ? "#ef6b68" : activeProp === "mage" ? "#39cc93" : activeProp === "guardian" ? "#f0b44d" : "#16a6c9");
  $("#propBlueprint").innerHTML = blueprintSvg(kit.kind);
  $("#propSize").textContent = kit.size;
  $("#propRoleLabel").textContent = kit.roleLabel;
  $("#propName").textContent = kit.name;
  $("#propPurpose").textContent = kit.purpose;
  $("#propShell").textContent = kit.shell;
  $("#propSensor").textContent = kit.sensor;
  $("#propCore").textContent = kit.core;
  $("#propEvents").textContent = kit.events;
  $("#propSafety").textContent = kit.safety;
  $("#propBudget").textContent = currentLanguage === "vi" ? kit.budget.replace("EST.", "DỰ KIẾN") : kit.budget;
  $("#propStatus").textContent = currentLanguage === "vi" ? (activeProp === "boss" ? "BỘ THIẾT KẾ BOSS" : "BỘ THIẾT KẾ HERO") : (activeProp === "boss" ? "BOSS DESIGN PACK" : "HERO DESIGN PACK");
  $("#propCallouts").innerHTML = kit.callouts.map((item, index) => `<div><b>${index + 1}</b><span>${item}</span></div>`).join("");
  const rows = [...commonPropBom, ...kit.bom];
  $("#propBomBody").innerHTML = rows.map(([part, qty, source, stage]) => `<tr><td>${localizeBomCell(part)}</td><td>${localizeBomCell(qty)}</td><td>${localizeBomCell(source)}</td><td><span class="stage-tag ${stage === "Bench" ? "" : "later"}">${localizeBomCell(stage)}</span></td></tr>`).join("");
  $("#propAssembly").innerHTML = kit.assembly.map(step => `<li><span></span><p>${step}</p></li>`).join("");
  $$(".role-card").forEach(card => card.classList.toggle("is-active", card.dataset.prop === activeProp));
  renderGuidedAssembly();
}

function downloadRoleBuildPack() {
  const kit = localizedKit();
  const rows = [...commonPropBom, ...kit.bom];
  const vi = currentLanguage === "vi";
  const markdown = [
    `# ${kit.name} — ${vi ? "Bộ hướng dẫn lắp Atlas" : "Atlas role build pack"}`, "", `${vi ? "Role" : "Role"}: ${kit.roleLabel}`, `${vi ? "Kích thước ý tưởng" : "Concept size"}: ${kit.size}`, `${vi ? "Ngân sách dự kiến" : "Planning budget"}: ${kit.budget}`, "",
    `## ${vi ? "Mục đích" : "Purpose"}`, "", kit.purpose, "", `## ${vi ? "Cấu trúc" : "Construction contract"}`, "", `- ${vi ? "Vỏ" : "Shell"}: ${kit.shell}`, `- ${vi ? "Cảm biến" : "Sensor"}: ${kit.sensor}`, `- ${vi ? "Vị trí lõi" : "Core"}: ${kit.core}`, `- ${vi ? "Sự kiện" : "Events"}: ${kit.events}`, `- ${vi ? "An toàn" : "Safety"}: ${kit.safety}`, "",
    `## ${vi ? "Các vị trí đánh số" : "Numbered modules"}`, "", ...kit.callouts.map((item, index) => `${index + 1}. ${item}`), "",
    `## ${vi ? "Bảng vật tư" : "Bill of materials"}`, "", vi ? "| Linh kiện | SL | Nguồn mua | Giai đoạn |" : "| Part | Qty | Source | Stage |", "| --- | ---: | --- | --- |", ...rows.map(row => `| ${row.map(localizeBomCell).join(" | ")} |`), "",
    `## ${vi ? "Lắp ráp từng bước" : "Assembly path"}`, "", ...kit.assembly.map((step, index) => `${index + 1}. ${step}`), "",
    `## ${vi ? "Giới hạn bằng chứng" : "Evidence boundary"}`, "", vi ? "Đây là bộ thiết kế. Phải hoàn tất kiểm tra an toàn vật lý, nguồn, độ thoải mái, sóng, nhận nhầm động tác và tích hợp Unity trước khi dùng thực địa." : "This is a design pack. Complete physical safety, power, comfort, radio, false-trigger, and Unity integration tests before field use.", ""
  ].join("\n");
  const blob = new Blob([markdown], { type: "text/markdown" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `atlas-${activeProp}-build-pack.md`;
  link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
  toast(vi ? `Đã tạo hướng dẫn ${kit.name}` : `${kit.name} build pack generated`);
}

function buildRingDots() {
  const root = $("#ringDots");
  root.innerHTML = Array.from({ length: 16 }, (_, index) => {
    const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
    const x = 500 + Math.cos(angle) * 50;
    const y = 276 + Math.sin(angle) * 50;
    return `<circle class="ring-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`;
  }).join("");
}

function currentDiagram() {
  const parts = [
    { type: "wokwi-esp32-devkit-v1", id: "esp", top: 38.4, left: 8.2, attrs: {} },
    { type: "wokwi-pushbutton", id: "castButton", top: 28.6, left: 258.1, attrs: { color: roles[state.role].color, label: "CAST", key: "C" } },
    { type: "wokwi-pushbutton", id: "specialButton", top: 106.8, left: 258.1, attrs: { color: "#7057d9", label: "SPECIAL", key: "S" } }
  ];
  const connections = [
    ["esp:25", "castButton:1.l", roles[state.role].color, []], ["castButton:2.l", "esp:GND.1", "#5d6672", []],
    ["esp:26", "specialButton:1.l", "#7057d9", []], ["specialButton:2.l", "esp:GND.1", "#5d6672", []]
  ];
  if (state.led) {
    parts.push({ type: "wokwi-led-ring", id: "ring", top: 190.1, left: 234.4, attrs: { pixels: "16" } });
    connections.push(["esp:18", "ring:DIN", "#f2c94c", []], ["esp:VIN", "ring:VCC", "#e05858", []], ["esp:GND.1", "ring:GND", "#5d6672", []]);
  }
  if (state.buzzer) {
    parts.push({ type: "wokwi-buzzer", id: "buzzer", top: 221.4, left: 34.7, attrs: { volume: "0.2" } });
    connections.push(["esp:27", "buzzer:2", "#f29f4b", []], ["esp:GND.1", "buzzer:1", "#5d6672", []]);
  }
  return { version: 1, author: "Atlas Prop Lab", editor: "wokwi", parts, connections, dependencies: {} };
}

function renderConfig() {
  const role = roles[state.role];
  document.documentElement.style.setProperty("--role", role.color);
  $("#roleBadge").textContent = role.label;
  $("#deviceId").textContent = `${state.role}-orb-01`;
  $("#transportBadge").textContent = { usb: "USB SERIAL", websocket: "WIFI / WEBSOCKET", espnow: "ESP-NOW" }[state.transport];
  $("#ringGraphic").classList.toggle("is-disabled", !state.led);
  $("#buzzerGraphic").classList.toggle("is-disabled", !state.buzzer);
  const diagram = currentDiagram();
  $("#partCount").textContent = currentLanguage === "vi" ? `${diagram.parts.length} LINH KIỆN · ${diagram.connections.length} DÂY` : `${diagram.parts.length} PARTS · ${diagram.connections.length} WIRES`;
  $("#pinList").innerHTML = pinMap.filter(item => {
    if (item.optional === "led") return state.led;
    if (item.optional === "buzzer") return state.buzzer;
    if (item.optional === "feedback") return state.led || state.buzzer;
    return true;
  }).map(item => `<div class="pin-row"><code>${item.pin}</code><span>${currentLanguage === "vi" ? (pinNamesVi[item.name] || item.name) : item.name}</span><i style="color:${item.color}"></i></div>`).join("");
  const bench = state.transport === "usb";
  const vi = currentLanguage === "vi";
  $("#validationBox").innerHTML = bench
    ? `<span class="validation-icon">✓</span><div><strong>${vi ? "Điểm khởi đầu an toàn trên bàn" : "Bench safe starting point"}</strong><p>${vi ? "Nguồn USB loại bỏ biến số pin và sóng trong lần chứng minh đầu." : "USB power keeps battery and radio variables out of the first proof."}</p></div>`
    : `<span class="validation-icon" style="background:var(--amber)">!</span><div><strong>${vi ? "Ứng viên thử thực địa" : "Field candidate"}</strong><p>${vi ? "Dùng mô phỏng trước; sau đó mới xác minh kết nối lại, tầm sóng và nhiễu trên phần cứng thật." : "Use the simulator now; validate reconnect, range, and interference on real hardware later."}</p></div>`;
  $$(".hero-token").forEach(token => token.classList.toggle("is-selected", token.dataset.role === state.role));
}

function downloadJson(name, value) {
  const blob = new Blob([JSON.stringify(value, null, 2) + "\n"], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob); link.download = name; link.click();
  setTimeout(() => URL.revokeObjectURL(link.href), 500);
  toast(`${name} generated`);
}

function toast(message) {
  const el = $("#toast"); el.textContent = message; el.classList.add("is-visible");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("is-visible"), 1800);
}

function showView(id) {
  $$(".view").forEach(view => view.classList.toggle("is-active", view.id === id));
  $$(".tab").forEach(tab => tab.classList.toggle("is-active", tab.dataset.view === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function eventPayload(action) {
  return { v: 1, deviceId: `${state.role}-orb-01`, role: roles[state.role].label, seq: ++state.sequence, type: "PLAYER_INTENT", action, atMs: Math.round(performance.now()) };
}

function addLog(status, payload, detail) {
  const item = document.createElement("li");
  const stamp = new Date().toLocaleTimeString([], { minute: "2-digit", second: "2-digit" });
  item.innerHTML = `<span>${stamp}</span><b class="${status}">${payload.action} · ${detail}</b>`;
  $("#eventLog").prepend(item);
  while ($("#eventLog").children.length > 12) $("#eventLog").lastElementChild.remove();
}

function updateMetrics() {
  $("#sentMetric").textContent = state.sent;
  $("#deliveredMetric").textContent = state.delivered;
  $("#lostMetric").textContent = state.lost;
  $("#avgMetric").textContent = state.delivered ? `${Math.round(state.latencyTotal / state.delivered)} ms` : "—";
  $("#bossHpText").textContent = `${state.bossHp} / 520`;
  $("#bossHpBar").style.width = `${(state.bossHp / 520) * 100}%`;
}

function animatePacket(isLost, duration) {
  const arena = $("#arena"); const packet = $("#packet");
  const hero = $(`.hero-token[data-role="${state.role}"]`); const boss = $(".boss-token");
  const area = arena.getBoundingClientRect(); const start = hero.getBoundingClientRect(); const end = boss.getBoundingClientRect();
  const x1 = start.left + start.width / 2 - area.left - 6; const y1 = start.top + start.height / 2 - area.top - 6;
  const x2 = end.left + end.width / 2 - area.left - 6; const y2 = end.top + end.height / 2 - area.top - 6;
  packet.classList.toggle("is-lost", isLost); packet.style.opacity = "1"; packet.style.left = `${x1}px`; packet.style.top = `${y1}px`;
  const targetX = isLost ? x1 + (x2 - x1) * .55 : x2; const targetY = isLost ? y1 + (y2 - y1) * .55 : y2;
  const animation = packet.animate([{ transform: "scale(.8)" }, { left: `${targetX}px`, top: `${targetY}px`, transform: isLost ? "scale(.25)" : "scale(1.3)" }], { duration: Math.max(180, duration), easing: "cubic-bezier(.2,.7,.2,1)" });
  animation.onfinish = () => { packet.style.opacity = "0"; packet.style.left = `${targetX}px`; packet.style.top = `${targetY}px`; };
}

function applyAction(action) {
  const profile = roles[state.role]; const effect = action === "CAST" ? profile.cast : profile.special;
  if (effect.damage) {
    state.bossHp = Math.max(0, state.bossHp - effect.damage);
    return `accepted · ${effect.damage} damage`;
  }
  if (effect.heal) return `accepted · team +${effect.heal} HP`;
  return `accepted · team shield +${effect.shield}`;
}

function triggerAction(action) {
  if (!roles[state.role] || !["CAST", "SPECIAL"].includes(action)) throw new Error("Unsupported action");
  if (state.cooldown[action]) { toast(`${action} is cooling down`); return { status: "cooldown" }; }
  state.cooldown[action] = true;
  const button = $(`.action-button[data-action="${action}"]`); button.disabled = true;
  setTimeout(() => { state.cooldown[action] = false; button.disabled = false; }, action === "CAST" ? 700 : 4000);

  const payload = eventPayload(action); const jitter = Math.round((Math.random() - .5) * state.latency * .25);
  const travel = Math.max(0, state.latency + jitter); const lost = Math.random() * 100 < state.loss;
  state.sent++; updateMetrics(); addLog("", payload, "sent"); animatePacket(lost, travel);
  setTimeout(() => {
    if (lost) { state.lost++; addLog("lost", payload, "lost"); }
    else { state.delivered++; state.latencyTotal += travel; addLog("good", payload, `${applyAction(action)} · ${travel} ms`); }
    updateMetrics();
  }, Math.max(180, travel));
  return { status: lost ? "scheduled_loss" : "scheduled_delivery", payload, latencyMs: travel };
}

function resetSimulation() {
  Object.assign(state, { bossHp: 520, sent: 0, delivered: 0, lost: 0, latencyTotal: 0, sequence: 0 });
  $("#eventLog").innerHTML = ""; updateMetrics(); toast(currentLanguage === "vi" ? "Đã đặt lại mô phỏng" : "Simulation reset");
}

function renderBuildPack() {
  $("#bomBody").innerHTML = bom.map(([part, qty, stage]) => `<tr><td>${localizeBomCell(part)}</td><td>${localizeBomCell(qty)}</td><td><span class="stage-tag ${stage === "Bench" ? "" : "later"}">${localizeBomCell(stage)}</span></td></tr>`).join("");
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("atlas-guide-checks") || "[]"); } catch { saved = []; }
  const steps = currentLanguage === "vi" ? guideStepsVi : guideSteps;
  $("#guideList").innerHTML = steps.map((step, index) => `<li><label><input type="checkbox" data-step="${index}" ${saved.includes(index) ? "checked" : ""}/><span>${step}</span></label></li>`).join("");
  updateGuideProgress();
}

function updateGuideProgress() {
  const checked = $$("#guideList input:checked").map(input => Number(input.dataset.step));
  localStorage.setItem("atlas-guide-checks", JSON.stringify(checked));
  $("#guideCount").textContent = `${checked.length} / 32`;
  $("#guideProgress").style.width = `${checked.length / 32 * 100}%`;
}

function registerWebMcp() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "configure_atlas_prop", title: "Configure Atlas prop",
      description: "Set the active hero role, transport, LED ring, and buzzer in the visible prototype workspace.",
      inputSchema: { type: "object", properties: { role: { enum: Object.keys(roles) }, transport: { enum: ["usb", "websocket", "espnow"] }, led: { type: "boolean" }, buzzer: { type: "boolean" } }, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (input.role !== undefined && !roles[input.role]) throw new Error("Invalid role");
        if (input.transport !== undefined && !["usb", "websocket", "espnow"].includes(input.transport)) throw new Error("Invalid transport");
        if (input.role !== undefined) state.role = input.role;
        if (input.transport !== undefined) state.transport = input.transport;
        if (input.led !== undefined) state.led = Boolean(input.led);
        if (input.buzzer !== undefined) state.buzzer = Boolean(input.buzzer);
        $("#roleSelect").value = state.role; $("#transportSelect").value = state.transport; $("#ledToggle").checked = state.led; $("#buzzerToggle").checked = state.buzzer;
        renderConfig(); showView("prototype");
        return { role: state.role, transport: state.transport, led: state.led, buzzer: state.buzzer };
      }
    },
    {
      name: "select_atlas_build_pack", title: "Select Atlas build pack",
      description: "Open one role-specific prop plan with its drawing, bill of materials, sensor placement, and assembly path.",
      inputSchema: { type: "object", properties: { prop: { enum: Object.keys(propKits) } }, required: ["prop"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!propKits[input.prop]) throw new Error("Unknown prop build");
        activeProp = input.prop;
        renderPropKit();
        showView("event-kit");
        return { prop: activeProp, name: propKits[activeProp].name, status: "design_pack" };
      }
    },
    {
      name: "trigger_atlas_prop_action", title: "Trigger prop action",
      description: "Send CAST or SPECIAL through the visible Atlas field simulator with the current latency and packet loss.",
      inputSchema: { type: "object", properties: { action: { enum: ["CAST", "SPECIAL"] } }, required: ["action"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) { showView("field"); return triggerAction(input.action); }
    },
    {
      name: "read_atlas_lab_state", title: "Read Atlas lab state",
      description: "Read the active prop configuration and field simulation metrics.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() { return { activeBuildPack: activeProp, role: state.role, transport: state.transport, led: state.led, buzzer: state.buzzer, simulation: { bossHp: state.bossHp, sent: state.sent, delivered: state.delivered, lost: state.lost } }; }
    }
  ];
  tools.forEach(tool => { try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch {} });
}

function init() {
  buildRingDots(); applyStaticTranslations(); renderPropKit(); renderConfig(); renderBuildPack(); updateMetrics();
  $$(".tab").forEach(tab => tab.addEventListener("click", () => showView(tab.dataset.view)));
  $$(".language-switch button").forEach(button => button.addEventListener("click", () => {
    currentLanguage = button.dataset.language;
    applyStaticTranslations(); renderPropKit(); renderConfig(); renderBuildPack();
  }));
  $$(".role-card").forEach(card => card.addEventListener("click", () => { activeProp = card.dataset.prop; activeAssemblyStep = 0; renderPropKit(); }));
  $("#downloadBuildPack").addEventListener("click", downloadRoleBuildPack);
  $("#guidedStepNav").addEventListener("click", event => {
    const button = event.target.closest("[data-guided-step]");
    if (!button) return;
    activeAssemblyStep = Number(button.dataset.guidedStep); renderGuidedAssembly();
  });
  $("#guidedPrev").addEventListener("click", () => { activeAssemblyStep = Math.max(0, activeAssemblyStep - 1); renderGuidedAssembly(); });
  $("#guidedNext").addEventListener("click", () => { activeAssemblyStep = Math.min(7, activeAssemblyStep + 1); renderGuidedAssembly(); });
  $("#partsReadyCheck").addEventListener("change", event => {
    localStorage.setItem(partsReadyStorageKey(), String(event.target.checked)); renderGuidedAssembly();
  });
  $("#guidedComplete").addEventListener("click", () => {
    if (!$("#partsReadyCheck").checked) {
      toast(currentLanguage === "vi" ? "Hãy xác nhận đã đủ linh kiện trước" : "Confirm all parts are ready first"); return;
    }
    const completed = getCompletedGuidedSteps();
    const existing = completed.indexOf(activeAssemblyStep);
    if (existing >= 0) completed.splice(existing, 1); else completed.push(activeAssemblyStep);
    localStorage.setItem(guidedStorageKey(), JSON.stringify(completed));
    if (existing < 0 && activeAssemblyStep < 7) activeAssemblyStep += 1;
    renderGuidedAssembly();
  });
  $("#roleSelect").addEventListener("change", event => { state.role = event.target.value; renderConfig(); });
  $("#transportSelect").addEventListener("change", event => { state.transport = event.target.value; renderConfig(); });
  $("#ledToggle").addEventListener("change", event => { state.led = event.target.checked; renderConfig(); });
  $("#buzzerToggle").addEventListener("change", event => { state.buzzer = event.target.checked; renderConfig(); });
  $("#downloadDiagram").addEventListener("click", () => downloadJson("diagram.json", currentDiagram()));
  $("#downloadConfig").addEventListener("click", () => downloadJson("atlas-prop-config.json", { version: 1, deviceId: `${state.role}-orb-01`, role: roles[state.role].label, transport: state.transport, features: { ledRing: state.led, buzzer: state.buzzer }, pins: { cast: 25, special: 26, led: state.led ? 18 : null, buzzer: state.buzzer ? 27 : null } }));
  $$(".hero-token").forEach(token => token.addEventListener("click", () => { state.role = token.dataset.role; $("#roleSelect").value = state.role; renderConfig(); }));
  $$(".action-button").forEach(button => button.addEventListener("click", () => triggerAction(button.dataset.action)));
  $("#resetSim").addEventListener("click", resetSimulation);
  $("#latencyRange").addEventListener("input", event => { state.latency = Number(event.target.value); $("#latencyValue").textContent = `${state.latency} ms`; });
  $("#lossRange").addEventListener("input", event => { state.loss = Number(event.target.value); $("#lossValue").textContent = `${state.loss}%`; });
  $("#guideList").addEventListener("change", updateGuideProgress);
  $("#clearChecklist").addEventListener("click", () => { $$("#guideList input").forEach(input => input.checked = false); updateGuideProgress(); });
  registerWebMcp();
}

init();
