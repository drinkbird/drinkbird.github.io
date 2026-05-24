#!/usr/bin/env ruby
# Mirror chapter quiz JSON from `_courses/` into `_data/` so Liquid can read
# them via `site.data.quizzes`. Course metadata lives entirely on Jekyll
# front matter (no longer in `_data/courses/`); only quizzes need the mirror
# because Jekyll's data system is the simplest way to look up JSON keyed by
# course/module/chapter.
#
# Run after any change to `*.quiz.json` files under `_courses/`.
#
#   ruby scripts/sync-courses-data.rb

require "fileutils"
require "json"

ROOT          = File.expand_path("..", __dir__)
COURSES_ROOT  = File.join(ROOT, "_courses")
DATA_QUIZZES  = File.join(ROOT, "_data", "quizzes")
DATA_COURSES  = File.join(ROOT, "_data", "courses")

FileUtils.rm_rf(DATA_QUIZZES)
FileUtils.rm_rf(DATA_COURSES) # legacy: course metadata is now in front matter
FileUtils.mkdir_p(DATA_QUIZZES)

Dir.glob(File.join(COURSES_ROOT, "*", "*", "*.quiz.json")).sort.each do |src|
  rel       = src.sub(COURSES_ROOT + "/", "")
  dest_rel  = rel.sub(/\.quiz\.json\z/, ".json")
  dest      = File.join(DATA_QUIZZES, dest_rel)
  JSON.parse(File.read(src))
  FileUtils.mkdir_p(File.dirname(dest))
  FileUtils.cp(src, dest)
  puts "quiz: #{dest_rel}"
end
