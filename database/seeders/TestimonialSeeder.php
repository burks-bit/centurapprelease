<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;
use Database\Factories\TestimonialFactory;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Generate at least 20 testimonials
        $testimonialCount = max((int)$this->command->ask('How many testimonials do you want to generate?', 20), 20);

        Testimonial::factory()->count($testimonialCount)->create();
    }
}
