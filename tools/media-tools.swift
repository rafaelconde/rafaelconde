#!/usr/bin/env swift

import AppKit
import AVFoundation
import CoreMedia
import Foundation

enum MediaToolError: Error, LocalizedError {
  case invalidArguments(String)
  case unsupportedCommand(String)
  case exportSessionUnavailable(String)
  case exportFailed(String)
  case imageGenerationFailed(String)
  case bitmapEncodingFailed(String)

  var errorDescription: String? {
    switch self {
    case .invalidArguments(let message),
         .unsupportedCommand(let message),
         .exportSessionUnavailable(let message),
         .exportFailed(let message),
         .imageGenerationFailed(let message),
         .bitmapEncodingFailed(let message):
      return message
    }
  }
}

func ensureParentDirectory(for url: URL) throws {
  let directory = url.deletingLastPathComponent()
  try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
}

func removeExistingItem(at url: URL) throws {
  if FileManager.default.fileExists(atPath: url.path) {
    try FileManager.default.removeItem(at: url)
  }
}

func absoluteURL(for path: String) -> URL {
  let url = URL(fileURLWithPath: path)
  return url.path.hasPrefix("/") ? url : URL(fileURLWithPath: FileManager.default.currentDirectoryPath).appendingPathComponent(path)
}

func exportVideo(inputPath: String, outputPath: String, presetName: String) throws {
  let inputURL = absoluteURL(for: inputPath)
  let outputURL = absoluteURL(for: outputPath)
  let asset = AVURLAsset(url: inputURL)

  guard let exportSession = AVAssetExportSession(asset: asset, presetName: presetName) else {
    throw MediaToolError.exportSessionUnavailable("Unable to create export session with preset \(presetName) for \(inputPath)")
  }

  try ensureParentDirectory(for: outputURL)
  try removeExistingItem(at: outputURL)

  exportSession.outputURL = outputURL
  exportSession.outputFileType = .mp4
  exportSession.shouldOptimizeForNetworkUse = true

  let semaphore = DispatchSemaphore(value: 0)
  exportSession.exportAsynchronously {
    semaphore.signal()
  }
  semaphore.wait()

  if exportSession.status != .completed {
    let message = exportSession.error?.localizedDescription ?? "Unknown AVAssetExportSession failure."
    throw MediaToolError.exportFailed("Video export failed for \(inputPath): \(message)")
  }
}

func exportPoster(inputPath: String, outputPath: String, maxDimension: CGFloat, at seconds: Double) throws {
  let inputURL = absoluteURL(for: inputPath)
  let outputURL = absoluteURL(for: outputPath)
  let asset = AVURLAsset(url: inputURL)
  let generator = AVAssetImageGenerator(asset: asset)
  generator.appliesPreferredTrackTransform = true
  generator.maximumSize = CGSize(width: maxDimension, height: maxDimension)

  let time = CMTime(seconds: seconds, preferredTimescale: 600)
  let cgImage: CGImage

  do {
    cgImage = try generator.copyCGImage(at: time, actualTime: nil)
  } catch {
    throw MediaToolError.imageGenerationFailed("Could not generate poster for \(inputPath): \(error.localizedDescription)")
  }

  let bitmap = NSBitmapImageRep(cgImage: cgImage)
  guard let data = bitmap.representation(
    using: .jpeg,
    properties: [
      .compressionFactor: 0.82
    ]
  ) else {
    throw MediaToolError.bitmapEncodingFailed("Could not encode poster JPEG for \(inputPath)")
  }

  try ensureParentDirectory(for: outputURL)
  try removeExistingItem(at: outputURL)
  try data.write(to: outputURL)
}

let args = Array(CommandLine.arguments.dropFirst())

do {
  guard let command = args.first else {
    throw MediaToolError.invalidArguments("Usage: media-tools.swift <transcode|poster> ...")
  }

  switch command {
  case "transcode":
    guard args.count == 4 else {
      throw MediaToolError.invalidArguments("Usage: media-tools.swift transcode <input> <output> <preset>")
    }
    try exportVideo(inputPath: args[1], outputPath: args[2], presetName: args[3])

  case "poster":
    guard args.count >= 3 && args.count <= 5 else {
      throw MediaToolError.invalidArguments("Usage: media-tools.swift poster <input> <output> [maxDimension] [seconds]")
    }

    let maxDimension = args.count >= 4 ? CGFloat(Double(args[3]) ?? 960) : 960
    let seconds = args.count == 5 ? Double(args[4]) ?? 1.0 : 1.0
    try exportPoster(inputPath: args[1], outputPath: args[2], maxDimension: maxDimension, at: seconds)

  default:
    throw MediaToolError.unsupportedCommand("Unsupported command: \(command)")
  }
} catch {
  fputs("\(error.localizedDescription)\n", stderr)
  exit(1)
}
