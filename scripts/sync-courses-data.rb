#!/usr/bin/env ruby
# Mirror course metadata + quiz JSON from `_courses/` into `_data/` so Liquid
# can read them. Canonical source stays under `_courses/`; `_data/` is rebuilt
# from scratch on every run. Run after any change under `_courses/`.
#
#   ruby scripts/sync-courses-data.rb

require "fileutils"
require "json"

ROOT          = File.expand_path("..", __dir__)
COURSES_ROOT  = File.join(ROOT, "_courses")
DATA_COURSES  = File.join(ROOT, "_data", "courses")
DATA_QUIZZES  = File.join(ROOT, "_data", "quizzes")

FileUtils.rm_rf(DATA_COURSES)
FileUtils.rm_rf(DATA_QUIZZES)
FileUtils.mkdir_p(DATA_COURSES)
FileUtils.mkdir_p(DATA_QUIZZES)

Dir.glob(File.join(COURSES_ROOT, "*", "course.json")).sort.each do |course_json|
  slug = File.basename(File.dirname(course_json))
  # Validate JSON parses, then copy verbatim.
  JSON.parse(File.read(course_json))
  FileUtils.cp(course_json, File.join(DATA_COURSES, "#{slug}.json"))
  puts "course: #{slug}"
end

Dir.glob(File.join(COURSES_ROOT, "*", "*", "*.quiz.json")).sort.each do |src|
  rel       = src.sub(COURSES_ROOT + "/", "")
  dest_rel  = rel.sub(/\.quiz\.json\z/, ".json")
  dest      = File.join(DATA_QUIZZES, dest_rel)
  JSON.parse(File.read(src))
  FileUtils.mkdir_p(File.dirname(dest))
  FileUtils.cp(src, dest)
  puts "quiz:   #{dest_rel}"
end
