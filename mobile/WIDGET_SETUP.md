# iOS/Android Widget 設置指南

## iOS Widget

### 1. 在 Xcode 中添加 Widget Extension

1. 打開 `mobile/ios/PickCardRebate.xcworkspace`
2. File → New → Target → Widget Extension
3. Product Name: `PickCardWidget`
4. 取消勾選 "Include Configuration Intent"

### 2. 配置 App Groups

1. 選擇主 App Target → Signing & Capabilities
2. 點擊 "+ Capability" → App Groups
3. 添加: `group.com.pickcardrebate.app`
4. 對 Widget Extension Target 重複相同步驟

### 3. 複製 Widget 代碼

將 `mobile/ios/PickCardWidget/PickCardWidget.swift` 複製到新建的 Widget Extension 目錄

### 4. 安裝原生依賴

```bash
# 在 mobile 目錄
npm install react-native-shared-group-preferences react-native-widgetkit

# 重新安裝 pods
cd ios && pod install
```

### 5. 在 App 中同步數據

在用戶卡包變更時調用:

```typescript
import { updateWidgetData } from '@/lib/widget';

// 當卡包更新時
await updateWidgetData(myCards.map(card => ({
  id: card.id,
  name: card.name,
  bank: card.bank,
  imageUrl: card.imageUrl,
})));
```

---

## Android Widget

### 1. 創建 Widget 文件

在 `mobile/android/app/src/main/java/com/pickcardrebate/app/widget/` 創建:

- `PickCardWidget.kt` - Widget Provider
- `PickCardWidgetReceiver.kt` - Broadcast Receiver

### 2. 在 AndroidManifest.xml 添加

```xml
<receiver
    android:name=".widget.PickCardWidgetReceiver"
    android:exported="true">
    <intent-filter>
        <action android:name="android.appwidget.action.APPWIDGET_UPDATE" />
    </intent-filter>
    <meta-data
        android:name="android.appwidget.provider"
        android:resource="@xml/pick_card_widget_info" />
</receiver>
```

### 3. 創建 Widget 佈局

在 `res/xml/pick_card_widget_info.xml` 和 `res/layout/pick_card_widget.xml`

### 4. 安裝依賴

```bash
npm install react-native-shared-group-preferences react-native-android-widget
```

---

## 測試

### iOS
1. 在模擬器或真機上運行 App
2. 添加一些信用卡到卡包
3. 長按主屏幕 → 添加 Widget → 找到 PickCardRebate

### Android
1. 運行 App 並添加卡片
2. 長按主屏幕 → Widgets → 找到 PickCardRebate Widget

---

## 注意事項

- Widget 數據每小時自動刷新
- 用戶需要在 App 中登入並添加卡片才會顯示
- 如果 Widget 顯示空白，請嘗試重新添加 Widget

