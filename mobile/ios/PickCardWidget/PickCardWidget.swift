//
//  PickCardWidget.swift
//  PickCardWidget
//
//  Created for PickCardRebate App
//

import WidgetKit
import SwiftUI

// MARK: - Data Models

struct CardInfo: Codable, Identifiable {
    let id: String
    let name: String
    let bank: String
    let imageUrl: String?
}

struct WidgetData: Codable {
    let cards: [CardInfo]
    let lastUpdated: Date
}

// MARK: - Timeline Provider

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> CardEntry {
        CardEntry(date: Date(), cards: [
            CardInfo(id: "placeholder", name: "信用卡", bank: "銀行", imageUrl: nil)
        ])
    }

    func getSnapshot(in context: Context, completion: @escaping (CardEntry) -> ()) {
        let entry = CardEntry(date: Date(), cards: loadCards())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let cards = loadCards()
        let entry = CardEntry(date: Date(), cards: cards)
        
        // Refresh every hour
        let nextUpdate = Calendar.current.date(byAdding: .hour, value: 1, to: Date())!
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    private func loadCards() -> [CardInfo] {
        // Load from App Group shared container
        guard let userDefaults = UserDefaults(suiteName: "group.com.pickcardrebate.app"),
              let data = userDefaults.data(forKey: "widgetCards"),
              let widgetData = try? JSONDecoder().decode(WidgetData.self, from: data) else {
            return []
        }
        return widgetData.cards
    }
}

// MARK: - Timeline Entry

struct CardEntry: TimelineEntry {
    let date: Date
    let cards: [CardInfo]
}

// MARK: - Widget Views

struct SmallWidgetView: View {
    var entry: Provider.Entry
    
    var body: some View {
        if let card = entry.cards.first {
            VStack(alignment: .leading, spacing: 8) {
                Text("常用卡片")
                    .font(.caption)
                    .foregroundColor(.secondary)
                
                HStack {
                    bankIcon(for: card.bank)
                        .frame(width: 32, height: 32)
                    
                    VStack(alignment: .leading) {
                        Text(card.name)
                            .font(.system(size: 12, weight: .semibold))
                            .lineLimit(2)
                        Text(card.bank)
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                
                Spacer()
                
                Text("點擊開啟計算機")
                    .font(.caption2)
                    .foregroundColor(.blue)
            }
            .padding()
        } else {
            VStack {
                Image(systemName: "creditcard")
                    .font(.title)
                    .foregroundColor(.secondary)
                Text("尚未添加卡片")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            .padding()
        }
    }
    
    func bankIcon(for bank: String) -> some View {
        let color = bankColor(for: bank)
        return Circle()
            .fill(color)
            .overlay(
                Text(String(bank.prefix(2)))
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(.white)
            )
    }
    
    func bankColor(for bank: String) -> Color {
        switch bank.lowercased() {
        case let b where b.contains("hsbc"): return Color.red
        case let b where b.contains("hang seng"): return Color.green
        case let b where b.contains("boc"): return Color.red
        case let b where b.contains("dbs"): return Color.red
        case let b where b.contains("citi"): return Color.blue
        case let b where b.contains("ae"), let b where b.contains("amex"): return Color.blue
        case let b where b.contains("scb"): return Color.green
        default: return Color.gray
        }
    }
}

struct MediumWidgetView: View {
    var entry: Provider.Entry
    
    var body: some View {
        HStack(spacing: 12) {
            ForEach(entry.cards.prefix(3)) { card in
                VStack {
                    bankIcon(for: card.bank)
                        .frame(width: 40, height: 40)
                    
                    Text(card.name)
                        .font(.system(size: 10, weight: .medium))
                        .lineLimit(2)
                        .multilineTextAlignment(.center)
                    
                    Text(card.bank)
                        .font(.system(size: 8))
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
            }
            
            if entry.cards.count < 3 {
                ForEach(0..<(3 - entry.cards.count), id: \.self) { _ in
                    VStack {
                        Circle()
                            .stroke(Color.secondary.opacity(0.3), style: StrokeStyle(lineWidth: 2, dash: [5]))
                            .frame(width: 40, height: 40)
                        Text("添加卡片")
                            .font(.system(size: 10))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity)
                }
            }
        }
        .padding()
    }
    
    func bankIcon(for bank: String) -> some View {
        let color = bankColor(for: bank)
        return Circle()
            .fill(color)
            .overlay(
                Text(String(bank.prefix(2)))
                    .font(.system(size: 12, weight: .bold))
                    .foregroundColor(.white)
            )
    }
    
    func bankColor(for bank: String) -> Color {
        switch bank.lowercased() {
        case let b where b.contains("hsbc"): return Color.red
        case let b where b.contains("hang seng"): return Color.green
        case let b where b.contains("boc"): return Color.red
        case let b where b.contains("dbs"): return Color.red
        case let b where b.contains("citi"): return Color.blue
        case let b where b.contains("ae"), let b where b.contains("amex"): return Color.blue
        case let b where b.contains("scb"): return Color.green
        default: return Color.gray
        }
    }
}

// MARK: - Widget Configuration

struct PickCardWidgetEntryView: View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family
    
    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        default:
            SmallWidgetView(entry: entry)
        }
    }
}

@main
struct PickCardWidget: Widget {
    let kind: String = "PickCardWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            PickCardWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("我的信用卡")
        .description("快速查看你常用的信用卡")
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

// MARK: - Preview

struct PickCardWidget_Previews: PreviewProvider {
    static var previews: some View {
        PickCardWidgetEntryView(entry: CardEntry(date: Date(), cards: [
            CardInfo(id: "1", name: "HSBC Red Card", bank: "HSBC", imageUrl: nil),
            CardInfo(id: "2", name: "DBS Live Fresh", bank: "DBS", imageUrl: nil),
            CardInfo(id: "3", name: "Citi Cash Back", bank: "Citi", imageUrl: nil),
        ]))
            .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}

